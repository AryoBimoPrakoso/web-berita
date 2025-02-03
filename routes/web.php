<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
 
Route::get('/', [NewsController::class, 'index']);
Route::get('/', [NewsController::class, 'index'])->name('news.index'); //Fitur Baru
Route::post('/news', [NewsController::class, 'store'])->middleware(['auth', 'verified'])->name('create.news');;
Route::get('/news', [NewsController::class, 'adminNews'])->middleware(['auth', 'verified'])->name('my.news');;
Route::get('/news/edit', [NewsController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit.news');;
Route::post('/news/update', [NewsController::class, 'update'])->middleware(['auth', 'verified'])->name('update.news');;
Route::post('/news/delete', [NewsController::class, 'destroy'])->middleware(['auth', 'verified'])->name('delete.news');;
Route::get('/news/{news}', [NewsController::class, 'show'])->name('news.show');
Route::get('/admin/news/{news}', [NewsController::class, 'adminShow'])->name('admin.news.show');
Route::get('/category/{category}', [NewsController::class, 'categoryNews'])->name('category.news');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
