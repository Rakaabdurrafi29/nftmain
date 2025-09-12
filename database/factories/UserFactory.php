<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'parent_id' => function () {
                return User::count() > 0 ? User::all()->random()->id : null;
            },
            'username' => fake()->unique()->userName,
            'wallet_address' => fake()->bothify('0x##?#?####??##?#??##?#?##?##??####???#??#'),
            'plan_id' => 1,
            'plan_str' => 'BASIC',
            'rank_id' => 1,
            'rank_str' => 'IRON',
            'join_amount' => 50,
            'join_discount_amount' => 0,
            'is_discount' => 0,
            'discount_amount' => 0,
            'avatar' => fake()->randomElement(['avatar-1.jpg', 'avatar-2.jpg', 'avatar-3.jpg', 'avatar-4.jpg', 'avatar-5.jpg', 'avatar-6.jpg', 'avatar-7.jpg', 'avatar-8.jpg', 'avatar-9.jpg']),
            'profile_bg' => fake()->randomElement(['pbg-1.jpg', 'pbg-2.jpg', 'pbg-3.jpg', 'pbg-4.jpg', 'pbg-5.jpg', 'pbg-6.jpg', 'pbg-7.jpg', 'pbg-8.jpg', 'pbg-9.jpg']),
            'is_suspended' => 0,
            'is_banned' => 0,
            'is_lock_for_new_join' => 0,
            'is_mint' => 1,
            'mint_transaction_hash' => fake()->bothify('0x##?#?####??##?#??##?#?##?##??####???#??#?##?#?##?##??####???#??#'),
        ];
    }
}
