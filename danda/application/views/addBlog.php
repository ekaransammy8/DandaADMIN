<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Add Article</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Add Article</li>
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
                <h3 class="card-title">Article Form</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form  accept-charset="UTF-8" class="form-horizontal" id="add_blog_form" method="post" enctype="multipart/form-data">
                <div class="card-body">
                   <div class="form-group">
                    <label for="customFile" class="col-form-label">Custom File</label>
                    <div class="custom-file col-sm-10">
                      <input type="file" class="custom-file-input" id="customFile" name="blog_image">
                      <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                    
                  </div>

                 <div class="preview form-group" style="display: none; text-align: center;">
                   <img id="blah" src="#" alt="your image" height="300" width="300" />
                  </div>

                  <div class="form-group row">
                    <label for="link" class="col-sm-2 col-form-label">Title</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="title" id="title" placeholder="Enter Title here..." required>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="link" class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                       <textarea class="form-control" rows="3" placeholder="Enter Description..." name="des" id="des" required></textarea>
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
 
 