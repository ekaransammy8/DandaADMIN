<?php
$row=$this->Login_model->getrecord('link_upload');
//print_r($row); die;
?>
<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark"></h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Player Setup</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <?php
            if ($this->session->flashdata('success_msg')) {
            echo "<div class='alert alert-success'><button class='close' data-dismiss='alert'>×</button>".$this->session->flashdata('success_msg') ." </div>";
            }
            if ($this->session->flashdata('error_msg')) {
            echo "<div class='alert alert-error'><button class='close' data-dismiss='alert'>×</button>". $this->session->flashdata('error_msg') . "</div>";
            }
            ?>
        <!-- Small boxes (Stat box) -->
        <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Set Player</h3>
              </div>
              <div class="card-body">
                <!-- Minimal style -->
                <div class="row">
                 
                  <div class="col-sm-6">
                    <!-- radio -->
                    <div class="form-group clearfix">
                      <div class="icheck-primary d-inline">
                        <input type="radio" id="radioPrimary1" name="player"  value="0"  <?php echo ($row['player']== '0') ?  "checked" : "" ;  ?> >
                        <label for="radioPrimary1">
                          You Tube
                        </label>
                      </div>
                      <div class="icheck-primary d-inline">
                        <input type="radio" id="radioPrimary2" name="player" value="1"  <?php echo ($row['player']== '1') ?  "checked" : "" ;  ?>>
                        <label for="radioPrimary2">
                          Ru Player
                        </label>
                      </div>
                     
                    </div>
                  </div>
                </div>
             
        
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                
              </div>
            </div>
        <!-- Main row -->
       
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 
 