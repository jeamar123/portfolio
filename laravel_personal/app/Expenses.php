<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    //
	protected $table = 'expenses';
	protected $fillable = [
		'full_date', 
		'day', 
		'month', 
		'year', 
		'category', 
		'description', 
		'value'
	];
}
