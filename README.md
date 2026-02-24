# MMM-NoticeBoard

Noticeboard Module for MagicMirror

A lightweight module for MagicMirror² that displays college or organizational notices in real-time. Designed to work with a Flask backend hosted remotely (e.g., Render) while keeping the Raspberry Pi client simple and efficient.

Features

Displays notices dynamically on MagicMirror.

Fetches data from a remote Flask backend via API.

Lightweight — minimal system resource usage.

Configurable update interval for near real-time updates.

Easy deployment and updates via GitHub.

Installation

Navigate to your MagicMirror modules folder:

cd ~/MagicMirror/modules

Clone the repository:

git clone https://github.com/yourusername/noticeboard-module.git

Add the module to config/config.js (see Configuration section).

Configuration

Example snippet for config.js:

{
  module: "noticeboard",
  position: "top_right", // Change position as needed
  config: {
    apiURL: "https://your-render-app.onrender.com/api/notices", // Flask backend URL
    updateInterval: 60000  // Time in milliseconds (default 60s)
  }
}

Config Options

Option	Description	Default
apiURL	URL of the backend API serving notices	required
updateInterval	Interval for refreshing notices in milliseconds	60000
Usage

Start MagicMirror on Raspberry Pi:

npm start

The noticeboard module will fetch notices from your backend and display them in the configured position.

Development

Update module code locally on your Mac.

Push changes to GitHub:

git add .
git commit -m "Update noticeboard"
git push

Pull updates on Raspberry Pi:

cd ~/MagicMirror/modules/noticeboard
git pull
Dependencies

MagicMirror²

Node.js (comes with MagicMirror)

A Flask backend serving notices via API (optional: hosted on Render or local server)

License

MIT License © [Your Name]