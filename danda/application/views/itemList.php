
 <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
           <h2>Article list</h2>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Articlelist</li>
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
              <h3 class="card-title">Article List</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive">
              <table id="example1" class="table table-bordered table-striped table-head-fixed">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Item Title</th>
                  <th>Image</th>
                  <th>Link</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  <?php if($getStatus){ foreach ($getStatus as $blog) { ?>
                   
                 
                <tr>
                  <td><?php echo $blog['id'] ?></td>
                  <td><?php echo $blog['title'] ?></td>
                  <td><img src="<?php echo isset($blog['item_image']) && ($blog['item_image']) ? base_url('assets/items/'). $blog['item_image']:'';?>"  alt="blog image" height= 100px; width= 175px;/></td>
                  <td> <?php echo $blog['link'] ?></td>
                  <td> <a onclick="itemDelete(<?php echo $blog['id']; ?>)" ><i class="fa fa-trash" aria-hidden="true"></i></a>  </td>
              
                <!--   <td>
                     <?php if($blog['status']=='0')
                    {
                      ?>
                       <input type="checkbox" name="toggle" data-id="<?php echo $blog['id']; ?>" id="b" value="<?php echo $blog['status']; ?>" data-toggle="toggle" data-off="Delete" data-on="Publish" data-onstyle="success" data-offstyle="danger" data-width="100" checked>
                      <?php
                    }?>
                    <?php if($blog['status']=='1')
                    {
                      ?>
                       <input type="checkbox" id="b"  name="toggle" data-id="<?php echo $blog['id']; ?>" value="<?php echo $blog['status']; ?>" data-toggle="toggle" data-off="Delete" data-on="Publish" data-onstyle="success" data-offstyle="danger" data-width="100">
                      <?php
                    }?>
                  </td>
 -->
                </tr>
              <?php  } } ?>
                </tbody>
                <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Item Title</th>
                  <th>Image</th>
                  <th>Link</th>
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

 