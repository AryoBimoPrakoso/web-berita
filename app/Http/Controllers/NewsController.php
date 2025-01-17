<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //FITUR BARU

        // Ambil kata kunci dari query string
        $search = $request->query('search');

        // Query berita dengan filter pencarian
        $query = News::query();
 
        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('content', 'like', "%{$search}%");
        }

        //END FITUR BARU

        // $news = new NewsCollection(News::OrderByDesc('id')->paginate(6));
        $news = new NewsCollection(News::orderBy('updated_at', 'desc')->paginate(6)->withQueryString());

        //Transformasi data untuk menambahkan image dan tanggal
        $news->getCollection()->transform(function ($item) {
            $item->image = $item->image
                ? asset('storage/' . $item->image)
                : null;

            if ($item->updated_at->eq($item->created_at)) {
                $item->display_date = $item->created_at->format('d-M-y H:i:s');
                $item->date_label = 'Dibuat pada ';
            } else {
                $item->display_date = $item->updated_at->format('d-M-y H:i:s');
                $item->date_label = 'Telah diperbarui pada ';
            }

            return $item;
        });

        // Kirim data ke frontend atau homepage
        return Inertia::render('Homepage', [
            'title' => 'MusicNews',
            'description' => 'Selamat Datang!',
            'news' => $news,
            // 'search' => $search, //fitur baru
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('news_images', 'public');
            $news->image = $imagePath;
        }

        $news->save();
        return redirect()->route('dashboard')->with('message', 'Berita Berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function adminNews(News $news)
    {

        $myNews = $news::where('author', auth()->user()->email)
            ->orderby('updated_at', 'desc')
            ->get()
            ->map(function ($newsItem) {
                $newsItem->isNew = Carbon::parse($newsItem->updated_at)->gt(Carbon::now()->subHour());
                return $newsItem;
            });

        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
        ]);
    }

    public function Show(News $news)
    {
        return Inertia::render('NewsDetail', [
            'news' => [
                'id' => $news->id,
                'title' => $news->title,
                'description' => $news->description,
                'category' => $news->category,
                'author' => $news->author,
                'image' => $news->image ? asset('storage/' . $news->image) : null,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {

        return Inertia::render('EditNews', [
            'mynews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Ambil berita yang ingin diupdate
        $news = News::findOrFail($request->id);

        // Update data berita
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;

        // News::where('id', $request->id)->update([
        //     'title' => $request->title,
        //     'description' => $request->description,
        //     'category' => $request->category,
        // ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }

            // Store new image
            $imagePath = $request->file('image')->store('news_images', 'public');
            $news->image = $imagePath;
        }
        $news->touch();
        $news->save();


        return redirect()->route('dashboard')->with('message', 'bisa nih');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $news = News::find($request->id);
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();
        return redirect()->back()->with('message', 'berita berhasil di hapus');
    }
}
