// jshint esversion: 6

class ScoreRegistrator {
    register(score) {
        let cookie = this._getCookie("scores");
        if (cookie) {
            let scores = JSON.parse(cookie);

            let i;
            for (i = 0; i < scores.length; i++) {
                if (scores[i] < score) {
                    break;
                }
            }

            for (let j = scores.length - 1; j > i; j--) {
                scores[j + 1] = scores[j];
            }

            scores.splice(i, 0, score);

            document.cookie = "scores=" + JSON.stringify(scores);
        } else {
            document.cookie = "scores=" + JSON.stringify([score]);
        }
    }

    getScores() {
        let cookie = this._getCookie("scores");
        if (cookie) {
            return JSON.parse(cookie);
        }

        return null;
    }

    _getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}