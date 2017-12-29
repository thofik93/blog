<?php
namespace App\Controller;

class ArticleMapper extends Mapper
{

  public function getArticleByLimit($limit) {
    $selectStatement = $this->pdo->select()
                           ->from('article')
                           ->orderBy('id', 'DESC')
                           ->limit($limit);

    $stmt = $selectStatement->execute();
    $data = $stmt->fetchAll();
    echo json_encode($data);
    exit;
  }

  public function getArticleById($id) {
    $selectStatement = $this->pdo->select()
                           ->from('article')
                           ->where('id', '=', $id);

    $stmt = $selectStatement->execute();
    $data = $stmt->fetch();
    echo json_encode($data);
    exit;
  }
}
