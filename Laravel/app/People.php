<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class People extends Model
{
    protected $table = 'people';

    protected $fillable = [
        'name', 'surname', 'docType', 'serie', 'email', 'phone', 'address', 'meet'
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
