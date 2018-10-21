<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Investments extends Model
{
    //
	protected $table = 'investments';
	protected $fillable = [
		'full_date', 
		'day', 
		'month', 
		'year', 
		'description', 
		'value'
	];
}
