<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Go Live</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Go live</li>
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
          <!-- left column -->
          <div class="col-md-12">
           
            <!-- Horizontal Form -->
            <div class="card card-info">
              <div class="card-header">

                <h3 class="card-title pull-right"><input type="checkbox" name="toggle1" data-id="" value="" data-toggle="toggle" data-off="Camera-Off" data-on="Camera-On" data-onstyle="success" data-offstyle="danger" data-width="100" ></h3>

               <!--  <?  if($getStatus['is_live']==1){?>

                <h3 class="card-title pull-right" ><input type="checkbox" name="toggle1" data-id="" value="" data-toggle="toggle" data-off="Camera-Off" data-on="Camera-On" data-onstyle="success" data-offstyle="danger" data-width="180" checked  ></h3>


                  <? }  if($getStatus['is_live']==0){?>
                     <h3 class="card-title pull-right"><input type="checkbox" name="toggle1" data-id="" value="" data-toggle="toggle" data-off="Camera-Off" data-on="Camera-On" data-onstyle="success" data-offstyle="danger" data-width="100" ></h3>
                   <? } ?> -->
              </div>
                 <!-- /.card-header -->

                 <div class="card-body">
                  <?php $data=$getStatus['webApiKey']; ?>
                   <div class="live" style="display: none;">
                      <iframe src="<?php echo $data ?>" style="border: none" allowfullscreen allow="microphone; camera" currentViewers></iframe>
                    </div>
                  
               
              </div>
              

             
              
            </div>
            <!-- /.card -->

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
 
 <!---------------------------------bootstrap model-------------------------->
  <div class="modal fade" id="server_msg_modal" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
         <!--  <button type="button" class="close" data-dismiss="modal">&times;</button> -->
          <h4 class="modal-title">Camera</h4>
        </div>
        <div class="modal-body">
           <div class="form-group">
              <label for="camera">Camera Name:</label>
               <?php echo form_input(array('name'=>'camera_name','id'=> 'cam','class'=>'form-control','type'=>'text','placeholder'=>'Enter the camera name...')); ?>
            </div>
         
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="cam1" data-dismiss="modal">Add</button>
        </div>
      </div>
      
    </div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
window.addEventListener('message', function(event) {
  if (event.origin !== 'https://dist.bambuser.net') {
    // Don't trust messages from other origins
    return;
  }
  var broadcasterEvent = event.data.broadcasterEvent;

  console.log("broadcasterEventsss",broadcasterEvent)
  if (broadcasterEvent && broadcasterEvent.name === 'registeredBroadcastId') {
    //console.log('broadcast id: ', broadcasterEvent.data);
     var url='<?php echo base_url()?>Welcome/test';
      let cam_name=$('#cam').val();
         var posting = $.post( url,{ broadcastID: broadcasterEvent.data,cam_name :cam_name});
          // Put the results in a div
          posting.done(function( data ) {
             //console.log('broadcast id: ', broadcasterEvent.data);
             console.log('livee broadcast id: ', data);
             console.log('camera_name: ', cam_name);
             alert("Live has started but you have to choose which camera to show in  live Camera list section")

        });
  }
  if (broadcasterEvent && broadcasterEvent.name === 'stopped') {
    console.log('broadcast id: ', broadcasterEvent.data);
     var url='<?php echo base_url()?>Welcome/brodcastStop';

         var posting = $.post( url);
          // Put the results in a div
          posting.done(function( data ) {
             //console.log('broadcast id: ', broadcasterEvent.data);
             console.log('archive  broadcast id: ', data);
        });
  }



}, false);

</script>