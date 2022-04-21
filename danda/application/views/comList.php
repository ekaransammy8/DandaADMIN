
 <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
           <h2>Upload list</h2>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Upload list</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
<!--want-->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Upload List</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive">
              <table id="example1" class="table table-bordered table-striped table-head-fixed">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Video</th>
                  <th>DateTime</th>
                  <th>Playlist</th>
                  <th>Publish/Draft</th>
                </tr>
                </thead>
                <tbody>
                  <?php if($blogs){ foreach ($blogs as $blog) { ?>
                   
                 
                <tr>
                  <td><?php echo $blog['id'] ?></td>
                  <td><?php echo $blog['title'] ?></td>
                  <td> 
                    <video width="320" height="240" controls>
                       <source src="<?php echo isset($blog['image']) && ($blog['image']) ? base_url().'assets/commercial/'. $blog['image']:'';?>" type="video/mp4">
                    </video>
                </td>
                  <td> <?php echo $blog['datetime'] ?></td> 

                  <td> <?php echo $blog['name'] ?></td> 
            
                 <td>
                   <a onclick="ConfirmsDialogs(<?php echo $blog['id']; ?>)"><i class="fa fa-trash" aria-hidden="true"></i></a>
                  <!--    <?php if($blog['status']=='0')
                    {
                      ?>
                       <input type="checkbox" name="toggle" data-id="<?php echo $blog['id']; ?>" id="com" value="<?php echo $blog['status']; ?>" data-toggle="toggle" data-off="Delete" data-on="Publish" data-onstyle="success" data-offstyle="danger" data-width="100" checked>
                      <?php
                    }?>
                    <?php if($blog['status']=='1')
                    {
                      ?>
                       <input type="checkbox" id="com"  name="toggle" data-id="<?php echo $blog['id']; ?>" value="<?php echo $blog['status']; ?>" data-toggle="toggle" data-off="Delete" data-on="Publish" data-onstyle="success" data-offstyle="danger" data-width="100">
                      <?php
                    }?> -->
                  </td>
                

                </tr>
              <?php  } } ?>
                </tbody>
                <tfoot>
                <tr>
                   <th>ID</th>
                  <th>Video</th>
                  <th>DateTime</th>
                  <th>Playlist</th>
                  <th>Publish/Draft</th>
                </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>

 