<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wallet extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function from_user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    // public function broadcastOn(string $event): array
    // {
    //     return [$this, $this->user];
    // }
}
