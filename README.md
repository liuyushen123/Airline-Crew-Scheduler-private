<div align='center'>
    <img src="doc/Cornhusker_logo.png" alt="Corhusker Airways LOGO" height="296">


<br>


<p>
    <a href="https://discord.gg/zh65xYXd"><img alt="Discord button" src="https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/discord.svg"></a>
    <img href="www.google.com" alt="Engines" src="https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/github_sponsor.svg">
    <a href="www.google.com"><img alt="Blog" src="https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/facebook.svg"></a>
    <a href="https://arxiv.org/abs/2508.08448"><img alt="arXiv: GPU OS vision" src="https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/tiktok.svg"></a>
    <br>
    <a href="https://arxiv.org/abs/2505.04021"><img alt="arXiv: Multi LLM Serving" src="https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/twitter.svg"></a>
    <a href="https://join.slack.com/t/ovg-project/shared_invite/zt-3fr01t8s7-ZtDhHSJQ00hcLHgwKx3Dmw"><img alt="Slack Join" src="https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/youtube.svg"></a>
    <a href="LICENSE"><img alt="License" src="https://gist.githubusercontent.com/cxmeel/0dbc95191f239b631c3874f4ccf114e2/raw/typescript.svg"></a>
  </p>
﻿
</div>

<h1 align="center"> Cornhusker Airways Crew Schduler</h1>
<h3 align="left">Introduction</h3>

- **Who are we?:** At Cornhusker Airways (CHA), we’re a passionate regional airline proudly serving the heart of the Midwest — connecting Lincoln, Iowa City, Evanston, and West Lafayette with safe, efficient, and friendly air travel. Our dedicated crews of skilled captains, first officers, and flight attendants embody professionalism and teamwork on every flight. With a focus on reliability, precision, and passenger care, CHA is driven by a spirit of innovation and commitment to excellence — keeping our flights on schedule and our passengers smiling from takeoff to touchdown!


<br>
<br>


# About this Project

- This project is a crew scheduling system designed for Cornhusker Airways (CHA), a small regional airline operating in the Midwest. The system manages flight schedules, aircraft assignments, and crew rosters — ensuring that every flight has a qualified captain, first officer, and the correct number of flight attendants based on aircraft capacity. It automatically checks for scheduling conflicts, validates crew qualifications, and logs every update with a unique, human-readable update number. The system can be run in either text or GUI mode and stores all data persistently, allowing flight and crew information to be recovered even after a power outage. Overall, this project provides an efficient, organized, and reliable way to handle airline scheduling operations.

- **Key Features**: the project features a React-based frontend, which provides a modern, responsive, and user-friendly interface for managing flight and crew data. The C# middleware serves as the backbone of the system, handling business logic, data validation, and communication between the frontend and the database. This architecture allows real-time updates, strong data integrity, and smooth error handling. Together, React and C# create a reliable, scalable, and intuitive platform that helps CHA streamline its scheduling operations and maintain smooth flight coordination.

- **Update Records and Logging System**: The update and logging system is a core feature of the Cornhusker Airways Crew Scheduling application. Every time a change is made — such as assigning a crew member, modifying flight times, or updating aircraft information — the system automatically creates a new update record with a unique, human-readable update number. This identifier includes semantically meaningful details like the date of the change or flight reference, making it easy to trace and interpret. Each record is securely stored and can be searched by flight number, crew member, airport, or date range, allowing users to quickly find and review past updates. This structure not only improves accountability and transparency but also ensures that CHA maintains a complete historical log of all schedule changes, even after system restarts or power outages.

# Contributor
