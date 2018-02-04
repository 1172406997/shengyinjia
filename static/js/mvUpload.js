

    $("#img_upload_btn1").bind("click", function (e) {
        $("#fileImg").click();
    });
      $("#img_upload_btn2").bind("click", function (e) {
        $("#fileImg2").click();
    });

        // 过滤图片
    function filter(files) {
        var arrFiles = [];
        for (var i = 0, file; file = files[i]; i++) {
            if (file.type.indexOf("image") == 0) {
                var reg = /(gif)$/i;
                if (reg.test(file.type)) {
//                	var tips = '暂不支持gif图片上传';
//                    layer.msg(tips,{time:1500});

                    if (file.size >= 2 * 1024 * 1024) {
                        var tips = '您这张"' + file.name + '"图片大小过大，应小于2M';
                        layer.msg(tips, {time: 1500});
                    } else {
                        arrFiles.push(file);
                    }
                }
                else if (file.size >= 10 * 1024 * 1024) {
                    var tips = '您这张"' + file.name + '"图片大小过大，应小于10M';
                    layer.msg(tips, {time: 1500});
                } else {
                    arrFiles.push(file);
                }
            } else {
                var tips = '文件"' + file.name + '"不是图片。';
                layer.msg(tips, {time: 1500});
            }
        }
        return arrFiles;
    }

     /**
     * 返回图片的地址
     */
    function getFileImgUrl(file) {
        var src;
        if (typeof file === 'object') {
            src = window.URL.createObjectURL(file);
        } else {
            src = file;
        }
        return src;
    }

    $(".R_top").on("change", "#fileImg", function (e) {
        // 获取文件列表对象
        var files = e.target.files || e.dataTransfer.files;
        // 对视频进行排除
        var tmpFiles = filter(files);
        //console.log(files);
        //console.log(tmpFiles);
         if (tmpFiles.length != 0) {
            var tempFile = tmpFiles[0];
            //console.log(tempFile);
            imgFile = tempFile;
            var imgsrc = getFileImgUrl(imgFile);
                    //console.log(imgsrc);
                    $("#preview_img1").show();
                    $("#preview_img1 img").eq(0).attr("src", imgsrc);
            // var reg = /(gif)$/;
            // if (reg.test(tempFile.type)) {
            //     $(".wocao").text("重选封面");
            //     imgFile = tempFile;
            //     // 重置
            //     uploadImgUrl = "";
            //     queryImgUploadState(imgFile);
            //     if (imgFile) {
            //         // uploadImg(imgFile);
            //         var imgsrc = getFileImgUrl(imgFile);
            //         console.log(imgsrc);
            //         $(".preview_img").show();
            //         $(".preview_img img").eq(0).attr("src", imgsrc);
            //     }
            // }
        }
        //每次选中都保存旧元素，并使用新的控件替换
        $(this).clone().replaceAll(file = this);
    });

     $(".R_footer").on("change", "#fileImg2", function (e) {
        // 获取文件列表对象
        var files = e.target.files || e.dataTransfer.files;
        // 对视频进行排除
        var tmpFiles = filter(files);
        //console.log(files);
        //console.log(tmpFiles);
         if (tmpFiles.length != 0) {
            var tempFile = tmpFiles[0];
            //console.log(tempFile);
            imgFile = tempFile;
            var imgsrc = getFileImgUrl(imgFile);
                    //console.log(imgsrc);
                    $("#preview_img2").show();
                    $("#preview_img2 img").eq(0).attr("src", imgsrc);
            // var reg = /(gif)$/;
            // if (reg.test(tempFile.type)) {
            //     $(".wocao").text("重选封面");
            //     imgFile = tempFile;
            //     // 重置
            //     uploadImgUrl = "";
            //     queryImgUploadState(imgFile);
            //     if (imgFile) {
            //         // uploadImg(imgFile);
            //         var imgsrc = getFileImgUrl(imgFile);
            //         console.log(imgsrc);
            //         $(".preview_img").show();
            //         $(".preview_img img").eq(0).attr("src", imgsrc);
            //     }
            // }
        }
        //每次选中都保存旧元素，并使用新的控件替换
        $(this).clone().replaceAll(file = this);
    });

   