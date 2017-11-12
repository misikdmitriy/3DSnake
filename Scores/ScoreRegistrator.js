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

            while (scores.length > 6) {
                scores.pop();
            }

            document.cookie = "scores=" + JSON.stringify(scores);
        } else {
            document.cookie = "scores=" + JSON.stringify([score]);
        }
    }

    get scores() {
        let cookie = this._getCookie("scores");
        if (cookie) {
            return JSON.parse(cookie);
        }

        return null;
    }

    removeAll() {
        var date = new Date(0);
        document.cookie = "scores=; path=/; expires=" + date.toUTCString();
    }

    _getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}