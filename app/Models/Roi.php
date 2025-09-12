<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roi extends Model
{
    use HasFactory;

    protected $casts = [
        'date_start' => 'immutable_datetime',
        'date_end' => 'immutable_datetime',
    ];
}
