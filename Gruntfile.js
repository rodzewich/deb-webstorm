/*jslint */
/*global module */

module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-ejs");
    grunt.loadNpmTasks("grunt-chmod");
    grunt.loadNpmTasks("grunt-copy");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        ejs: {
            webstorm: {
                options: {
                    name: "webstorm",
                    version: "9.0"
                },
                files: [
                    {
                        expand : true,
                        cwd: "webstorm",
                        src    : "DEBIAN/*",
                        dest: "temp/webstorm",
                        ext    : ""
                    },
                    {
                        expand : true,
                        cwd: "webstorm",
                        src    : [
                            "*.desktop",
                            "**/*.desktop"
                        ],
                        dest: "temp/webstorm",
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
                    "temp/webstorm/DEBIAN/postinst",
                    "temp/webstorm/DEBIAN/preinst",
                    "temp/webstorm/DEBIAN/postrm",
                    "temp/webstorm/DEBIAN/prerm",
                    "temp/webstorm/*.sh",
                    "temp/webstorm/**/*.sh"
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
    // fakeroot dpkg-deb --build temp --output package_1.0-2.deb

};