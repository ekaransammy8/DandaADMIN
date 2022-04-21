<?php


    require('config.php');
    global $pdo;
    $qry = "select * from link_upload";
    $stmt = $pdo->prepare($qry);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
   // print_r($row); die;

?>

<!DOCTYPE html>
<html lang="en" class=" js no-touch">

<head>
  <title>RU</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,600|Raleway:600,300|Josefin+Slab:400,700,600italic,600,400italic' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="css/slick-team-slider.css" />
  <link rel="stylesheet" type="text/css" href="css/style1.css">
  <!-- =======================================================
    Theme Name: Tempo
    Theme URL: https://bootstrapmade.com/tempo-free-onepage-bootstrap-theme/
    Author: BootstrapMade.com
    Author URL: https://bootstrapmade.com
  ======================================================= -->
</head>

<body>
  <!--HEADER START-->
  <div class="main-navigation navbar-fixed-top">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
          
      
      <div class="logo float-left" style="margin-top:10px;">
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <h1 class="text-light"><a href="#header"><span>NewBiz</span></a></h1> -->
        <a href="#" class="scrollto"> <img src="img/logo_ru.png" alt="logo"></a>
      </div>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav navbar-right">
            <li class="active"><a href="#banner">Home</a></li>
            <li ><a href="https://rawuncensored.com/presspage.php">Press Page</a></li>
       <li class="mbl"><a href="http://mbl-group-international.com/"> Mbl</a></li>
        <li class="getintouch"> <a href="https://rawuncensored.com/support.php">GET IN TOUCH</a></li>
          </ul>
      
        </div>
      </div>
    </nav>
  </div>
  <!--HEADER END-->

  <!--BANNER START-->
  <div id="banner" class="section-padding">
  
   

    <div class="embed-responsive embed-responsive-16by9">
    <!-- <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> -->
    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/<?php echo $row['links']?>" target="_blank"></iframe>
  </div>
  
      
  </div>
 
  <!--BANNER END-->
  
  
  
<div class="container">
  <div class="row">
  
  <div class="page-title text-center">
         <!--  <h1>Download Ru App From Store</h1> -->
          
          <!-- <hr class="pg-titl-bdr-btm"></hr> -->
        </div>
    
  
    <div class="col-md-4">
    
      <div class="logo_new">
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <h1 class="text-light"><a href="#header"><span>NewBiz</span></a></h1> -->
        <a href="#" class="scrollto"> <img src="img/logo_new.png" alt="logo"></a>
      </div>
    
    </div>
    
    <div class="col-md-8" style="margin-top:55px;">
        <a href="https://play.google.com/store/apps/details?id=com.maxmartionii.ru"> <img src="img/google_play.png"></a>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
          <a href="https://apps.apple.com/us/app/ru-app/id1479007992?ls=1"> <img src="img/appstore_play.png"></a>
        </div>
  </div>
  
    
</div>
 
 
  <!--FOOTER END-->
  <div class="footer-bottom">
    <div class="container">
      <div style="visibility: visible; animation-name: zoomIn;" class="col-md-12 text-center wow zoomIn">
        <div class="footer_copyright">
          <p> © Copyright, All Rights Reserved.</p>
          
        </div>
      </div>
    </div>
  </div>
  <script src="js/jquery.min.js"></script>
  <script src="js/jquery.easing.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script type="text/javascript" src="js/slick.min.js"></script>
  <script type="text/javascript" src="js/custom.js"></script>
  <script src="contactform/contactform.js"></script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-149502027-1"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-149502027-1');
  </script>
</body>

</html>
