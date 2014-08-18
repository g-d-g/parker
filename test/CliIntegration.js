/*! Parker v0.0.0 - MIT license */

var expect = require('chai').expect
    exec = require('child_process').exec;

describe('The Parker CLI tool', function () {
    it('should display usage information when invoked with a -h or --help switch', function (done) {
        exec('node parker.js -h', function (err, stdout, stderr) {
            expect(stdout).to.contain('Usage:');
            done();
        });
    });

    it('should display help information when invoked with no switches', function (done) {
        exec('node parker.js', function (noSwitchErr, noSwitchStdout, noSwitchStderr) {
            exec('node parker.js --help', function (helpErr, helpStdout, helpStderr) {
                expect(noSwitchStdout).to.equal(helpStdout);
                done();
            });
        }); 
    });
    
    it('should display warnings only when invoked with a --format="warnings" switch', function (done) {
        exec('node parker.js test/fixtures/specificity-warning.css --format="warnings"', function (err, stdout, stderr) {
            expect(stdout).to.contain('Failure: Top Selector Specificity: 900');
            expect(stdout).to.contain('Failure: Specificity Per Selector: 900');
            expect(stdout).to.contain('Failure: Top Selector Specificity: 900');
            done();    
        });    
    });
    
    it(
        'should not report results for metrics with no configured warning'
        + ' figure when invoked with a --format="warnings" switch',
        function (done) {
            exec('node parker.js test/fixtures/specificity-warning.css --format="warnings"', function (err, stdout, stderr) {
                expect(stdout).to.not.contain('Failure: Media Queries:');
                done();
            });
        }            
    ); 
});