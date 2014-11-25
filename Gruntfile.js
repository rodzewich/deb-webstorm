/*jslint */
/*global module */

module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-ejs");
    grunt.loadNpmTasks("grunt-chmod");
    grunt.loadNpmTasks("grunt-copy");

    grunt.initConfig({
        pkg: grunt.file.readJSON("webstorm.json"),
        ejs: {
            webstorm: {
                options: grunt.file.readJSON("package.json"),
                files: [
                    {
                        expand : true,
                        cwd: "webstorm",
                        src    : "DEBIAN/*",
                        dest   : "temp",
                        ext    : ""
                    },
                    {
                        expand : true,
                        cwd: "webstorm",
                        src    : [
                            "*.desktop",
                            "**/*.desktop"
                        ],
                        dest   : "temp",
                        ext    : ".desktop"
                    }
                ]
            }
        },
        chmod: {
            webstorm: {
                options: {
                    mode: "755"
                },
                src: [
                    "temp/DEBIAN/postinst",
                    "temp/DEBIAN/preinst",
                    "temp/DEBIAN/postrm",
                    "temp/DEBIAN/prerm",
                    "temp/*.sh",
                    "temp/**/*.sh"
                ]
            }
        },
        copy: {
            webstorm: {
                files: [
                    {
                        expand : true,
                        cwd: "webstorm",
                        src    : [
                            "*",
                            "**/*",
                            "!DEBIAN/*",
                            "!DEBIAN/**/*",
                            "!*.desktop",
                            "!**/*.desktop"
                        ],
                        filter : "isFile",
                        dest   : "temp"
                    }
                ]
            }
        }
    });

    grunt.registerTask("webstorm", "Build webstorm package.", function () {
        if (true) {
            grunt.task.run("checkout");
        } else {
            grunt.task.run("build");
        }
    });

    grunt.registerTask("default", "description", ["ejs:webstorm", "copy:webstorm", "chmod:webstorm"]);
    // fakeroot dpkg-deb --build temp

};