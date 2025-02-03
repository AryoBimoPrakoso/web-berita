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
    public function categoryNews($category)
    {
        $query = News::where('category', $category);

        $news = new NewsCollection($query->orderBy('updated_at', 'desc')->paginate(30)->withQueryString());

        $news->getCollection()->transform(function ($newsitem) {
            $newsitem->isNew = Carbon::parse($newsitem->updated_at)->gt(Carbon::now()->subHour());
            $newsitem->image = $newsitem->image
                ? asset('storage/' . $newsitem->image)
                : null;

            if ($newsitem->updated_at->eq($newsitem->created_at)) {
                $newsitem->display_date = $newsitem->created_at->format('d-M-y H:i:s');
                $newsitem->date_label = 'Dibuat pada ';
            } else {
                $newsitem->display_date = $newsitem->updated_at->format('d-M-y H:i:s');
                $newsitem->date_label = 'Telah diperbarui pada ';
            }

            return $newsitem;
        });

        return Inertia::render('CategoryNews', [
            'title' => "Berita $category",
            'news' => $news,
            'currentCategory' => $category
        ]);
    }



    public function index(Request $request)
    {
        $query = News::query();
        $searchResults = collect(); // Initialize empty collection for search results
    
        // Jika ada parameter pencarian
        if ($request->has('search')) {
            $searchQuery = $request->search;
            $searchResults = $query->where(function ($q) use ($searchQuery) {
                $q->where('title', 'LIKE', "%{$searchQuery}%")
                    ->orWhere('description', 'LIKE', "%{$searchQuery}%")
                    ->orWhere('category', 'LIKE', "%{$searchQuery}%");
            })
            ->orderBy('created_at', 'desc')
            ->get();
        }
    
        // Ambil berita terbaru
        $latestNews = News::orderBy('created_at', 'desc')
            ->take(5)
            ->get();
    
        // Ambil berita trending berdasarkan views
        $trendingNews = News::orderBy('views', 'desc')
            ->take(5)
            ->get();
    
        // Transform collections
        $transformNews = function ($newsItem) {
            $newsItem->isNew = Carbon::parse($newsItem->updated_at)->gt(Carbon::now()->subHour());
            $newsItem->image = $newsItem->image ? asset('storage/' . $newsItem->image) : null;
    
            if ($newsItem->updated_at->eq($newsItem->created_at)) {
                $newsItem->display_date = $newsItem->created_at->format('d-M-y H:i:s');
                $newsItem->date_label = 'Dibuat pada ';
            } else {
                $newsItem->display_date = $newsItem->updated_at->format('d-M-y H:i:s');
                $newsItem->date_label = 'Telah diperbarui pada ';
            }
    
            return $newsItem;
        };
    
        $latestNews->transform($transformNews);
        $trendingNews->transform($transformNews);
        $searchResults->transform($transformNews);
    
        return Inertia::render('Homepage', [
            'title' => 'AryoNews',
            'description' => 'Selamat Datang!',
            'latestNews' => $request->has('search') ? $searchResults : $latestNews,
            'trendingNews' => $trendingNews,
            'filters' => $request->only(['search']),
            'hasSearch' => $request->has('search')
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
        // Increment view count
        $news->increment('views');

        $otherNews = News::where('id', '!=', $news->id)
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->description,
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                ];
            });

        $newsData = [
            'id' => $news->id,
            'title' => $news->title,
            'description' => $news->description,
            'category' => $news->category,
            'author' => $news->author,
            'views' => $news->views,
            'image' => $news->image ? asset('storage/' . $news->image) : null,
            'display_date' => $news->updated_at->eq($news->created_at)
                ? $news->created_at->format('d-M-y H:i:s')
                : $news->updated_at->format('d-M-y H:i:s'),
            'date_label' => $news->updated_at->eq($news->created_at)
                ? 'Dibuat pada '
                : 'Telah diperbarui pada ',
        ];

        return Inertia::render('NewsDetail', [
            'news' => $newsData,
            'otherNews' => $otherNews,
        ]);
        // $otherNews = News::where('id', '!=', $news->id)
        //     ->latest()
        //     ->take(10)
        //     ->get()
        //     ->map(function ($item) {
        //         return [
        //             'id' => $item->id,
        //             'title' => $item->title,
        //             'description' => $item->description,
        //             'image' => $item->image ? asset('storage/' . $item->image) : null,
        //         ];
        //     });

        // $newsData = [
        //     'id' => $news->id,
        //     'title' => $news->title,
        //     'description' => $news->description,
        //     'category' => $news->category,
        //     'author' => $news->author,
        //     'image' => $news->image ? asset('storage/' . $news->image) : null,
        //     'display_date' => $news->updated_at->eq($news->created_at)
        //         ? $news->created_at->format('d-M-y H:i:s')
        //         : $news->updated_at->format('d-M-y H:i:s'),
        //     'date_label' => $news->updated_at->eq($news->created_at)
        //         ? 'Dibuat pada '
        //         : 'Telah diperbarui pada ',
        // ];

        // return Inertia::render('NewsDetail', [
        //     'news' => $newsData,
        //     'otherNews' => $otherNews,
        // ]);
    }

    public function adminShow(News $news)
    {
        $newsData = [
            'id' => $news->id,
            'title' => $news->title,
            'description' => $news->description,
            'category' => $news->category,
            'author' => $news->author,
            'image' => $news->image ? asset('storage/' . $news->image) : null,
            'updated_at' => $news->updated_at
        ];

        return Inertia::render('AdminNewsDetail', [
            'news' => $newsData
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
