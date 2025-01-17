<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content'];

    protected $appends = ['isNews'];


    public function getIsNewsAttribute() {
        return Carbon::parse($this->updated_at)->gt(Carbon::now()->subHour());
    }
}
