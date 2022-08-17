const urls = Object.freeze({
  players: {
    baseUrl: "/players",
    getById: "/players/",
  },
  vitals: {
    heartRate: {
      add: "/vitals/heart-rate/add",
    },
    bloodPressure: {
      add: "/vitals/blood-pressure/add",
    },
    bloodOxygen: {
      add: "/vitals/blood-oxygen/add",
    },
  },
});

export default urls;
