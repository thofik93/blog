<?php
namespace App\Controller;

abstract class Mapper {
  protected $pdo;

  public function __construct($pdo) {
    $this->pdo = $pdo;
  }

}
