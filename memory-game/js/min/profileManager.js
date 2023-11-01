class ProfileManager {
    static playerId = null;
    static linkPost = "https://juegos.lmneuquen.com/api/resultado";
    static currentLink = "";
    static token = "NWQ3MGI3ZTQtZjUzNS00NTYyLWE2MTEtYWQ5Njk5MjY5MjI2";

    static async GetProfileCode() {
        this.initLink();
        const playerIdMatch = this.currentLink.match(/id_player=([0-9]+)/);

        if (playerIdMatch && playerIdMatch[1]) {
            this.playerId = playerIdMatch[1];
        } else {
            console.error("User ID not detected");
        }
    }

    /**
     * 
     * @param {number} points 
     * @param {number} milestone 
     */
    static async SaveNewPoint(points, milestone) {

        if (this.playerId !== null) {
            try {
                const playerStats = {
                    "juego_token": atob(this.token),
                    "user_id": this.playerId,
                    "puntaje": points,
                    "hitos": milestone,
                };

                const response = await fetch(linkPost, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(playerStats),
                });
        
                if (response.status === 200) {
                    console.log("New point saved successfully.");
                } else if (response.status === 400) {
                    console.error("The request contains invalid or incomplete data");
                } else if (response.status === 401) {
                    console.error("The API Key is invalid or was not provided");
                } else if (response.status === 500) {
                    console.error("An error occurred on our server. Please try again later.");
                }

            } catch (error) {
                console.error("Error while saving the new point: ", error);
            }
        } else {
            console.warn("No player ID available. Cannot save a new point.");
        }
    }

    static initLink() {
        this.currentLink = window.location.href;
    }
}