// jshint esversion: 6

class ScoreRegistrator {
    register(score) {
        document.cookie = "record=" + score;
    }
}