Module.register("MMM-NoticeBoard", {

    defaults: {
        apiUrl: "https://notice-server-bxr9.onrender.com/api/notices",
        updateInterval: 5000,
        rotationInterval: 10000,
        animationSpeed: 1000
    },

    start: function () {
        this.notices = [];
        this.currentIndex = 0;
        this.loaded = false;
        this.showingNotice = false;

        this.getNotices();
        this.scheduledUpdate();
        this.startCycle();
    },

    getNotices: function () {
        fetch(this.config.apiUrl)
            .then(response => response.json())
            .then(data => {

                this.notices = data;
                this.loaded = true;
                this.currentIndex = 0;

                this.updateDom(this.config.animationSpeed);

            })
            .catch(error => {
                console.error("Notice fetch Error:", error);
            });
    },

    scheduledUpdate: function () {
        setInterval(() => {
            this.getNotices();
        }, this.config.updateInterval);
    },

    scheduledRotation: function () {
        setInterval(() => {

            if (this.notices.length > 1) {

                this.currentIndex++;

                if (this.currentIndex >= this.notices.length) {
                    this.currentIndex = 0;
                }

                this.updateDom(this.config.animationSpeed);
            }

        }, this.config.rotationInterval);
    },

    startCycle: function () {

    setInterval(() => {

        if (!this.loaded || this.notices.length === 0) {
            return;
        }

        if (this.showingNotice) {

            // Hide notice → show MagicMirror
            this.hide();
            this.showingNotice = false;

        } else {

            // Show notice
            this.currentIndex++;

            if (this.currentIndex >= this.notices.length) {
                this.currentIndex = 0;
            }

            this.show();
            this.updateDom(this.config.animationSpeed);
            this.showingNotice = true;
        }

    }, this.config.rotationInterval);

},

    getDom: function () {

    const wrapper = document.createElement("div");

    if (!this.loaded || this.notices.length === 0) {
        return wrapper;
    }

    const notice = this.notices[this.currentIndex];

    if (notice.image_url && notice.image_url !== "") {

        const img = document.createElement("img");
        img.src = notice.image_url + "?t=" + Date.now();
        img.className = "fullscreen-notice";

        wrapper.appendChild(img);
    }

    return wrapper;
}

});