var PLUKIT = {
    guitar: {
        acoustic: {
            nylon: {
                mp3: 'gtr_aco_nylon.mp3'
            },
            steel: {
                mp3: 'gtr_aco_steel.mp3'
            }
        },
        electric: {
            clean: {
                mp3: 'gtr_elec_clean.mp3'
            },
            dist: {
                mp3: 'gtr_elec_dist'
            }
        }
    }
};

var Plukit = function(options){

    // settings obj
    var defaults           = {};
    defaults.sampleFile    = PLUKIT.guitar.acoustic.steel.mp3;
    defaults.samplePath    = 'modules/plukit/';
    defaults.sampleLength  = 2000;
    defaults.device        = 'browser';

    // setup options
    this.settings = _.extend(this, defaults, options);
    this.player   = this.getPlayer();

};

Plukit.prototype.getPlayer = function() {

    switch(this.settings.device) {
        case 'browser':
            return this.getHowler();
            break;
        case 'Android':
            return this.getAndroid();
            break;
    }

};

Plukit.prototype.getHowler = function(){

    var howler = new Howl({
      urls: [this.settings.samplePath + this.settings.sampleFile],
      sprite: this.calcSpriteOffsets()
    });

    return howler;

};

Plukit.prototype.getAndroid = function(){

    return 'got android';

};

Plukit.prototype.calcSpriteOffsets = function(){

    var that          = this;
    var keys          = ['c','c#/db','d','d#/eb','e','f','f#/gb','g','g#/ab','a','a#/bb','b'];
    var offset        = 0;
    var sprite        = {};
    var octaves       = 5;
    
    _.times(octaves,function(n){

        var octave = n+1;
        _.each(keys, function(key){

            var key_notes = key.split('/');
            sprite[key_notes[0] + octave] = [offset, that.settings.sampleLength];
            if(key_notes.length > 1){
                sprite[key_notes[1] + octave] = [offset, that.settings.sampleLength];
            } 
            
            offset += that.settings.sampleLength;

        });

    });

    return sprite;

};

Plukit.prototype.play = function (note) {
    
    switch(this.settings.device) {
        case 'browser':
            this.player.play(note);
            break;
        case 'Android':
            this.playAndroid(note);
            break;
    }

};

Plukit.prototype.playAndroid = function (note){

    mp3 = new Media(this.samplePath + this.sampleFile, onSuccess, onError);

    mp3.play();

    function onSuccess() { alert("playAudio():Audio Success"); }

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

};
