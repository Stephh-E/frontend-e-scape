EventScape: Event Management Social Platform
Links
Github Repositories

Frontend: https://github.com/Stephh-E/frontend-e-scape

Backend: https://github.com/hsc996/EventScape

Deployment

Frontend: (Netlify) https://eventscape1.netlify.app/

Development: (Render) https://eventscape-43t2.onrender.com

Contributors
Steph Elsley: User Stories, Wireframes

Hannah Scaife: Data Flow Diagram, App Architechture Diagram

Note: Research and website description completed by both contributors.

About EventScape
EventScape is a modern, customisable app designed to simplify event planning and invitations. Its offers a private, visually engaging platform where users can host, discover and personalise events with creative themes inspired by Bebo's customisation features. We've integrated the Google Calendar in order to further streamline event scheduling, making it an intuitive alternative to traditional platforms like Facebook Events.

EventScape's focus on privacy, creativity and community engagement makes it ideal for individuals and groups seeking a unique and user-friendly way to organise events, from casual gatherings to larger-scale activites.

Core Features
Event Creation:

Add event name, date, time, location, and description.
Pre-set templates and colour schemes for quick customisation.
Options to set events as Public and Private
User can track what events they’re attending on the My Calendar page
RSVP and Guest Management:

Simple RSVP system for attendees, they can pick attending, maybe or cannot attend
Event Discovery:

Search page to browse public events based on filters (categories, location, date)
Privacy and Security:

Customisable privacy settings for profiles and events
Ability to hide personal information
Mobile Optimisation:

A mobile-first design to ensure smooth event creation and discovery on smartphones.
Expanded Features
Advanced Customisation:

Drag-and-drop editor for deeper event page personalisation.
Upload custom-made images or themes for event invites.
Google Calendar Integration:

Sync events to personal calendars using the Google Calendar API.
Receive notifications and reminders directly from the calendar.
Recurring Events:

Options to set up weekly, monthly, or custom recurring events.
Social Sharing:

Generate shareable links for public events.
Integrated sharing to other platforms (e.g., Instagram, Twitter).
Community Features:

Event ratings and reviews to build trust for public events.
User communities or groups for niche interests (e.g., musicians, families).
Target Audience
The app is designed for individuals and small communities seeking a fresh alternative to traditional event platforms like Facebook.

Key demographics include:

Young Creatives and Professionals:

Musicians, artists, designers, and students looking for modern, visually engaging ways to host and find events. This includes personas like Blake and Mia, who value style and ease of use.
Local Businesses and Event Hosts:

Bar managers, community leaders, and small business owners who need quick, professional event creation tools. This includes personas like Liam, who regularly host public events.
Families and Community Organisers:

Parents, planners, and educators looking for safe, family-friendly event platforms. This includes personas like Sarah, who prioritise privacy and child-appropriate content.
Tech Stack
The app is built using the MERN stack (MongoDB, Express.js, React, and Node.js) for a scalable, dynamic, and mobile-responsive experience. Additional integrations enhance functionality and user engagement.

Frontend:

Framework: React
Routing: React Router DOM
Styling: Font Awesome, Flexbox
Build Tool: Vite
Backend:

Framework: Node.js, Express.js
Database: MongoDB Atlas, managed with Mongoose
Authentication & Security: bcrypt, jsonwebtoken, helmet
Third-Party API Integration

Google Calendar API, Google's OAuth 2.0 flow.
Deployment:

Front-End: Netlify
Back-End: Render
Version Control:

Git and GitHub for collaborative development.
Development Tools:

Build & Development: Vite, Nodemon
Linting: ESLint with React-specific plugins
Data Flow Diagram
DFD

This Data Flow Diagram (DFD) follows the Yourdon and Coad notation in order to provide a clear and structured visualisation of how the data will be processed, stores and communicated within this application. By following this notation style, the diagram ensures consistency, clarity and an easily interpretable view of system interaction at a high level. The diagram uses the following conventions:

Circles (Processes): Represent the key operations or processes in the system, which transform incoming data into outputs.
Arrows (Data Flows): Indicate the direction of data movement between processes, data stores and external entites, showcasing how information is passed througout the system. Each arrow is colour-coded, to avoid confusion: a diagram colour key has been included for the same purpose. For further clarity, each arrow has been numbered regarding where each data process begins and ends.
Squares (External Entities): Depict the external actors or systems that interact with the system, either providing input or receiving input.
Open Rectangles (Data Stores): Illustrate where data is stored within the system, such as databases or file storage.
Application Architechture Diagram
AAD

User Stories
The image below is the user stories for EventScape, 4 user stories in the "As a {person}, I want to do {feature/action} because of {need/reason}" format.

UserStories

As an elabration of the user stories above, please see below the first iteration of the user personas and their different perscpectives of what problem the app will solve.

UserPersonas

The second iteration(below), is a refined version of the user stories with more of a focus on the MVP of the app.

UserPersonas2

Wireframes
For the wireframes I've kept the styling simple, using Poppins as the main font, used because its a clear easy to read font. I've gone with a simple colour scheme, to not be too disctracting for users, especially since a large feature of the app is the colour customisation.

ColourPalette

Here is the Sitemap showing the interaction between pages: Sitemap

Wide-Screen Wireframes
Below you can see the wide-screen wireframes, the first screenshot shows the 'Create new Account 'page, which upon clicking 'Sign-up' leads to the 'See My Events' page, which leads to the My Events/My Calendar. The 'Create New' button leads to the Event Creation page, where the user creates the event invitation. In the second screenshot there are examples of what a user might 'publish' as their styled Event Invite. There is also a 'See you there!' page when a user clicks 'Attending' on an event.

WireframeDesktop1

WireframeDesktop2

Mobile Wireframes
I've kept the Mobile wireframes simple, similar to the Wide-screen wireframes, just with vertical stacking instead of the larger grid used for the wide-screen wireframes.

WireframesMobile

Trello Board
appdec

wireframe

finaliseA

dates_trello

Our team has utilised the Agile planning methodology with Trello to efficiently manage our application development process. We've structured our workflow with "To Do," "In Progress," and "Completed" card lists to maintain clear organisation. Each task card includes due dates, relevant links, detailed checklists, and member assignments, ensuring accountability and streamlined collaboration.

REFERENCES
GeeksforGeeks (2024) Event Management Web App using MERN, GeeksforGeeks [Preprint]. Available at: https://doi.org/10/2628/2963/7726/7835.

S, Y. (2021). What exactly a MERN stack is? [online] Medium. Available at: https://medium.com/techiepedia/what-exactly-a-mern-stack-is-60c304bffbe4.

Visual Paradigm. (2024). DFD Tutorial: Yourdon Notation. [online] Available at: https://online.visual-paradigm.com/knowledge/software-design/dfd-tutorial-yourdon-notation.
