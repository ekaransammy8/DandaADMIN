
<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Upload Video</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Upload Video</li>
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
                <h3 class="card-title">Upload Video</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form class="form-horizontal" id="addComm" method="post" enctype="multipart/form-data">
                <div class="card-body">


                   <div class="form-group row">
                    <label for="customFile" class="col-sm-2 col-form-label">Upload Video</label>
                    <div class="custom-file col-sm-10">
                      <input type="file" class="custom-file-input" id="customFile" name="comm_image">
                      <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="customFile" class="col-sm-2 col-form-label">Upload Thumbnail</label>
                    <div class="custom-file col-sm-10">
                      <input type="file" class="custom-file-input" id="customFile" name="comm_thumb">
                      <label class="custom-file-label" for="customFile">Choose Thumbnail Image</label>
                    </div>
                  </div>

                   <div class="form-group row">
                    <label for="link" class="col-sm-2 col-form-label">Title</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="title" id="title" placeholder="Enter Title here..." required>
                    </div>
                  </div>

                

                 <!-- <div class="preview form-group" style="display: none; text-align: center;">
                   <img id="blah" src="#" alt="your image" height="300" width="300" />
                  </div> -->


                    <div class="form-group">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="radio1" checked value="1">
                          <label class="form-check-label">Select from playlist</label>
                        </div>

                        <div class="form-group"  id="select_playlist">
                            <select class="form-control" name="optn_playlist">
                                <option value="" >Select from playlist</option>
                              <?php if($playlists){ foreach($playlists as $playlist) { 
                                      //print_r($country['country_id']);exit;
                             ?>
                             <option value="<?php echo $playlist['id']; ?>" ><?php echo $playlist['name']; ?><a href="#"></a></option>
                              <?php }}else{ ?>
                                <option value="" >No playlist yet</option>
                              <?php } ?>
                            </select>
                      </div>



                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="radio1" value="2">
                      <label class="form-check-label">Add new playlist</label>
                    </div>


                    <div class="form-group row" style="display: none" id="add_playlist">
                      <label for="link" class="col-sm-2 col-form-label">Add new Playlist</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" name="playlist" id="title" placeholder="Enter Playlist name here...">
                      </div>
                    </div>


                </div>


                


             
            


                  
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <input type="submit" name="submit" value="Add"class="btn btn-info" id="submit">
                  <button type="submit" class="btn btn-default float-right">Cancel</button>
                </div>
                <!-- /.card-footer -->
              </form>
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
 
 