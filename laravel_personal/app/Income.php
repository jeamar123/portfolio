<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    //
	protected $table = 'income';
	protected $fillable = [
		'full_date', 
		'day', 
		'month', 
		'year', 
		'description', 
		'value'
	];
}
