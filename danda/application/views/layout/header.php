<? $get_status=$this->Login_model->get_record_by_id('admin_live',array('status'=>'1'));
$session_id=$this->session->userdata('session_id');


 ?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <?php if (!empty($title))
        { ?>
            <title><?php echo $title; ?></title>
      <?php  } else{ ?>
            <title><?php echo "RU Dashboard"; ?></title>
  <?php }?>
   <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Font Awesome -->
   <link href="<?php echo base_url('assets/plugins/fontawesome-free/css/all.min.css');?>
    " rel="stylesheet" />
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bbootstrap 4 -->
   <link href="<?php echo base_url('assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css');?>
    " rel="stylesheet" />

  <!-- iCheck -->
   <link href="<?php echo base_url('assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css');?>
    " rel="stylesheet" />
 
  <!-- Theme style -->
   <link href="<?php echo base_url('assets/dist/css/adminlte.min.css');?>
    " rel="stylesheet" />

  <!-- overlayScrollbars -->
   <link href="<?php echo base_url('assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css');?>
    " rel="stylesheet" />
 
  <!-- Daterange picker -->
   <link href="<?php echo base_url('assets/plugins/daterangepicker/daterangepicker.css');?>
    " rel="stylesheet" />
 
  <!-- summernote -->
   <link href="<?php echo base_url('assets/plugins/summernote/summernote-bs4.css');?>
    " rel="stylesheet" />
  
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css" rel="stylesheet">
  <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet">
  <!--toogle button style sheet-->
  <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link"></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link"></a>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <!-- <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div> -->
      </div>
    </form>

    <!-- Right navbar links -->
    
  </nav>

   <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="<?php echo base_url('Welcome/')?>" class="brand-link">
      <img src="<?php echo base_url('assets/dist/img/logo_ru.png');?>" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">RU App</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="<?php echo base_url('assets/dist/img/user2-160x160.jpg')?>" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <? if($session_id==1){ $name='Admin';} else{$name='Guest';}?>
          <a href="#" class="d-block"><?= "Welcome $name" ?></a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
         <!--  <li class="nav-item has-treeview menu-open">
            <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            
          </li> -->

           

          <li class="nav-item has-treeview">
           <a href="" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                 Live Video
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<?php echo site_url('Welcome/goLive');?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p> Go Live</p>
                </a>
              </li>
<? if($session_id==1){ ?>
              <li class="nav-item">
              <a href="<?php echo site_url('Welcome/cameraList');?>" class="nav-link">
               <i class="far fa-circle nav-icon"></i>
                <p>
                   Live Camera list 
                </p>
              </a>
           </li>
  <? } ?>
       <!-- <?  $count=0;  foreach($get_status as $status):?>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p onclick="myFunction(<?= $status['id']?>)">Camera <?= ++$count;?></p>
                </a>
              </li>
            <?  endforeach; ?> -->
            </ul>
          </li>
         
          <li class="nav-item">
            <!-- <a href="<?php echo site_url('index.php/Login/add_link/');?>" class="nav-link"> -->
            <a href="<?php echo site_url('Welcome/add_link');?>" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Add YouTube links
              </p>
            </a>
          </li>

          

          <li class="nav-item">
            <a href="<?php echo site_url('Welcome/player_setup');?>" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Choose Player
              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="<?php echo site_url('Welcome/add_artist');?>" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Add Artist
              </p>
            </a>
          </li>

         <li class="nav-item">
           
          </li>

          <li class="nav-item has-treeview">
           <a href="" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                 Article
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<?php echo site_url('Welcome/addBlog');?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Article</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="<?php echo site_url('Welcome/blogList');?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Article List</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
           <a href="" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                 Products for Live
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<?php echo site_url('Welcome/addItem');?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Product Live</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="<?php echo site_url('Welcome/itemList');?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Product List Live</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-item has-treeview">
           <a href="" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                 Uploads RU Video
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<?php echo site_url('Welcome/addCom');?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Upload Ru Video</p>
                </a>
              </li>

              <li class="nav-item">
                <a href="<?php echo site_url('Welcome/comList');?>" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>RU Video List</p>
                </a>
              </li>
            </ul>
          </li>

           <li class="nav-item">
            <a href="<?php echo site_url('Welcome/appSettings');?>" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Live App Settings
              </p>
            </a>
          </li>



          <li class="nav-item">
            <a href="#" onclick="logout()" class="nav-link">
              <i class="nav-icon fa fa-sign-out"></i>
              <p>
                Logout
              </p>
            </a>
          </li>
         
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>