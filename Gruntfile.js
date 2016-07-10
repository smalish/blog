module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),


        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
        //uglify配置信息
        uglify: {
          options: {
            stripBanners:true,
            banner: '/*! <%= pkg.name %> - <%= pkg.version %>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
                files: [{
                    expand:true,
                    cwd:'public/javascripts/app',//js目录下
                    src:'**/*.js',//所有js文件
                    dest: 'public/javascripts/appBuild',//输出到此目录下
                    ext: '.min.js'
                }]
            }
        },
        //jshint配置信息
        jshint: {
          all: ['Gruntfile.js', 'public/javascripts/app/*.js']
          // options: ['Gruntfile.js', 'public/javascripts/app/*.js'],
          // build: {
          //   jshintrc: '.jshintrc'
          // }
        },
        //csslint配置信息
        csslint: {
            options: {
              csslintrc: '.csslintrc'
            },
            strict: {
              options: {
                import: 2
              },
              src: ['public/stylesheets/app/*.css']
            },
            lax: {
              options: {
                import: false
              },
              src: ['public/stylesheets/app/*.css']
            }
        },
        //cssmin配置信息
        cssmin: {
          options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-‘+‘<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
              files: [{
                  expand:true,
                  cwd:'public/stylesheets/app',//css目录下
                  src:'**/*.css',//所有css文件
                  dest: 'public/stylesheets/appmin',//输出到此目录下
                  ext: '.min.css'
              }]
            }
        },
        //watch配置
        watch: {
          files:['public/javascripts/app/*.js', 'public/stylesheets/app/*.css'],
          tasks:['uglify', 'jshint', 'csslint', 'cssmin'],
          options: {spawn:false}
        }


    });

    // These plugins provide necessary tasks.加载插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.注册默认任务
    grunt.registerTask('default', ['csslint', 'jshint', 'cssmin', 'uglify', 'watch']);
};
