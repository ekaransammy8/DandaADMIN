<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">App Settings</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">App Settings</li>
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
        <div class="row">


       </div>

          <!-- left column -->
        <div id="delivery">
         <div class="row">
          <div class="col-md-12">
           
            <!-- Horizontal Form -->
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">App-Settings Form</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
            
              <form class="form-horizontal" id="myForm" action="<?= base_url('Welcome/updateSettings')?>" method="post" >
                <div class="card-body">

                  <div class="form-group row">
                    <label for="link" class="col-sm-2 col-form-label">Android Bambuser Key</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="android" id="android" value="<?= $data['androidApiKey']?>" required>
                    </div>
                  </div>

                   <div class="form-group row">
                    <label for="link" class="col-sm-2 col-form-label">IOS Bambuser Key</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="ios" id="ios" value="<?= $data['iosApiKey']?>" required>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="link" class="col-sm-2 col-form-label">Web Bambuser Key</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="web" id="web" value="<?= $data['webApiKey']?>" required>
                    </div>
                  </div>

                 
                  <div class="form-group row">
                    <label for="link" class="col-sm-2 col-form-label">Api Key</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="api" id="web" value="<?= $data['ApiKey']?>" required>
                    </div>
                  </div>

                  
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <input type="submit" name="submit" value="Add"class="btn btn-info" onsubmit="" id="submit">
                </div>
                <!-- /.card-footer -->
              </form>
            </div>
            <!-- /.card -->

          </div>
         </div>
        </div>
       
        </div>
        <!-- /.row -->
        <!-- Main row -->
       
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 <script type="text/javascript">
  $(function() {
  $('#myForm').submit(function(event) {
      $.ajax({
        type: "POST",
        url: "<?php echo base_url();?>Welcome/updateSettings",
        cache: false,
        success: function(response)
        {     
          alert(response);
         /* if( response == "OK" ) {
            //window.location.href = "https://traala.com/cabscout/dashboard/Login/";
            window.location.href = "<?php echo base_url();?>";
          }*/
        }
      });
    })
})
  </script>
 