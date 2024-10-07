import React, { useState, useEffect } from "react";

export function GoogleCalendarComponent() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("googleAccessToken") || null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);

  const CLIENT_ID = "314028545054-lefknak0c73cco79ilthg3fbss4cr4do.apps.googleusercontent.com";
  const API_KEY = "AIzaSyA2JY3Vert8rFnOolVT0WPN4_FFtCYMZPQ";
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://apis.google.com/js/api.js";
    script1.async = true;
    script1.defer = true;
    script1.onload = gapiLoaded;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://accounts.google.com/gsi/client";
    script2.async = true;
    script2.defer = true;
    script2.onload = gisLoaded;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const gapiLoaded = () => {
    window.gapi.load("client", initializeGapiClient);
  };

  const initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
    maybeEnableButtons();
  };

  const gisLoaded = () => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
    });
    setAccessToken(client);
    setGisInited(true);
    maybeEnableButtons();
  };

  const maybeEnableButtons = () => {
    if (gapiInited && gisInited) {
      document.getElementById("authorize_button").style.visibility = "visible";
    }
  };

  const handleAuthClick = async () => {
    if (!accessToken) return;

    accessToken.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setAccessToken(resp.access_token);
      localStorage.setItem("googleAccessToken", resp.access_token);

      document.getElementById("signout_button").style.visibility = "visible";
      document.getElementById("authorize_button").innerText = "Refresh";
    };

    if (window.gapi.client.getToken() === null) {
      accessToken.requestAccessToken({ prompt: "consent" });
    } else {
      accessToken.requestAccessToken({ prompt: "" });
    }
  };

  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken("");
      setAccessToken(null);
      localStorage.removeItem("googleAccessToken");

      document.getElementById("content").innerText = "";
      document.getElementById("authorize_button").innerText = "Authorize";
      document.getElementById("signout_button").style.visibility = "hidden";
    }
  };

  const getValidAccessToken = async () => {
    try {
      const auth = await window.gapi.auth2.getAuthInstance();
      if (!auth.isSignedIn.get()) {
        await auth.signIn();
      }
      return auth.currentUser.get().getAuthResponse().access_token;
    } catch (error) {
      console.error("Error getting valid access token:", error);
      throw error;
    }
  };

  const createEvent = async () => {
    try {
      const accessToken = await getValidAccessToken();
      const event = {
        summary: "Google I/O 2015",
        location: "800 Howard St., San Francisco, CA 94103",
        description: "A chance to hear more about Google's developer products.",
        start: {
          dateTime: "2024-05-28T09:00:00-07:00",
          timeZone: "America/Sao_Paulo",
        },
        end: {
          dateTime: "2024-05-28T17:00:00-09:00",
          timeZone: "America/Sao_Paulo",
        },
      };

      const request = window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
        auth: accessToken,
      });

      request.execute(function (event) {
        console.log("Event created:", event.htmlLink);
        // Aqui você pode lidar com o link do evento criado
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <p>Google Calendar API Quickstart</p>
      <button id="authorize_button" onClick={handleAuthClick}>
        Authorize
      </button>
      <button id="signout_button" onClick={handleSignoutClick}>
        Sign Out
      </button>
      <button onClick={createEvent}>Add event</button>
      <pre id="content" style={{ whiteSpace: "pre-wrap" }}></pre>
    </div>
  );
}
