/*jslint */
/*global module */

module.exports = function(grunt) {

    /*grunt.loadNpmTasks("grunt-clean");*/
    grunt.loadNpmTasks("grunt-ejs");
    grunt.loadNpmTasks("grunt-chmod");
    grunt.loadNpmTasks("grunt-copy");

    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        ejs : {
            package: {
                options: grunt.file.readJSON("package.json"),
                files: [
                    {
                        expand : true,
                        cwd    : "package",
                        src    : "DEBIAN/*",
                        dest   : "temp",
                        ext    : ""
                    },
                    {
                        expand : true,
                        cwd    : "package",
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
        chmod : {
            package: {
                options: {
                    mode: "755"
                },
                src: [
                    "temp/DEBIAN/postinst",
                    "temp/DEBIAN/preinst",
                    "temp/DEBIAN/portrm",
                    "temp/DEBIAN/prerm",
                    "temp/*.sh",
                    "temp/**/*.sh"
                ]
            }
        },
        copy : {
            package: {
                files: [
                    {
                        expand : true,
                        cwd    : "package",
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

    grunt.registerTask("default", "description", ["ejs:package", "copy:package", "chmod:package"]);
    // fakeroot dpkg-deb --build temp

};