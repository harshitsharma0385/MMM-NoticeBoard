Module.register("MMM-NoticeBoard", {
    defaults: {
        apiUrl: "https://notice-server-bxr9.onrender.com/api/notices",
        updateInterval: 60000,
        rotationInterval: 10000,
        animationSpeed: 1000
    },
    start: function() {
        this.notices = [];
        this.currentIndex = 0;
        this.loaded = false;
        this.getNotices();
        this.scheduledUpdate();
        this.scheduledRotation();
    },

    getNotices: function(){
        fetch(this.config.apiUrl)
            .then(response => response.json())
            .then(data => {
                this.notices = data;
                this.loaded = true;
                this.currentIndex = 0;
                this.updateDom(this.config.animationSpeed);
            })
            .catch(error => {
                console.error("Notice fetch Error: ", error);
            });
    },
    scheduledUpdate: function(){
        setInterval(() => {
            this.getNotices();
        }, this.config.updateInterval);
    },

    scheduledRotation: function() {
        setInterval(() => {
            if(this.notices.length >1){
                this.currentIndex++;
                if(this.currentIndex >= this.notices.length){
                    this.currentIndex = 0;
                }
                this.updateDom(this.config.animationSpeed);
            }
        }, this.config.rotationInterval);
    },

    getDom: function(){
        const wrapper = document.createElement("div");

        if(!this.loaded){
            wrapper.innerHTML = "Loading Notices...";
            return wrapper;
        }

        if(this.notices.length === 0){
            wrapper.innerHTML = "No active Notices";
            return wrapper;
        }
        const notice = this.notices[this.currentIndex];
        wrapper.innerHTML = `
            <div class="notice-card">
                <h2>${notice.title}</h2>
                <p>${notice.description}</p>
                
            </div>
        `;
        return wrapper;
    }
});


// <div class="expiry">Valid until: ${notice.expiry}</div>