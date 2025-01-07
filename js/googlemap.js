"use strict";

// This loads helper components from the Extended Component Library,
// https://github.com/googlemaps/extended-component-library.
import { APILoader } from "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";

const CONFIGURATION = {
  mapOptions: {
    center: { lat: 37.4221, lng: -122.0841 },
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoom: 11,
    zoomControl: false,
    maxZoom: 22,
    mapId: "",
  },
  mapsApiKey: "Insert your own key",
};

const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set([
  "street_number",
  "administrative_area_level_1",
  "postal_code",
]);

const ADDRESS_COMPONENT_TYPES_IN_FORM = [
  "location",
  "locality",
  "administrative_area_level_1",
  "postal_code",
  "country",
];

function getFormInputElement(componentType, suffix) {
  return document.getElementById(`${componentType}-input-${suffix}`);
}

function fillInAddress(place, suffix) {
  function getComponentName(componentType) {
    for (const component of place.address_components || []) {
      if (component.types[0] === componentType) {
        return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType)
          ? component.short_name
          : component.long_name;
      }
    }
    return "";
  }

  function getComponentText(componentType) {
    return componentType === "location"
      ? `${getComponentName("street_number")} ${getComponentName("route")}`
      : getComponentName(componentType);
  }

  for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
    const inputElement = getFormInputElement(componentType, suffix);
    if (inputElement) {
      inputElement.value = getComponentText(componentType);
    }
  }
}

function renderAddress(place, suffix) {
  const mapEl = document.querySelector(`gmp-map[data-suffix="${suffix}"]`);
  const markerEl = document.querySelector(
    `gmp-advanced-marker[data-suffix="${suffix}"]`
  );

  if (place.geometry && place.geometry.location) {
    mapEl.center = place.geometry.location;
    markerEl.position = place.geometry.location;
  } else {
    markerEl.position = null;
  }
}

async function initMap() {
  const { Autocomplete } = await APILoader.importLibrary("places");

  const mapOptions = CONFIGURATION.mapOptions;
  mapOptions.mapId = mapOptions.mapId || "DEMO_MAP_ID";
  mapOptions.center = mapOptions.center || { lat: 37.4221, lng: -122.0841 };

  const setupAutocomplete = async (suffix) => {
    const autocomplete = new Autocomplete(
      getFormInputElement("location", suffix),
      {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert(
          `No details available for input: '${place.name}'`
        );
        return;
      }
      renderAddress(place, suffix);
      fillInAddress(place, suffix);
    });
  };

  // Initialize for Pickup
  setupAutocomplete("pu");

  // Initialize for Drop Off
  setupAutocomplete("do");
}

initMap();
