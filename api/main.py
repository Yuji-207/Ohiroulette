from attrdict import AttrDict
from fastapi import FastAPI

from dotenv import load_dotenv
import os
import requests
from pydantic import BaseModel


app = FastAPI()

load_dotenv(".env")
key = os.environ.get("API_KEY")


class Place(BaseModel):
    name: str
    rating: int
    vicinity: str
    latitude: float
    longitude: float


@app.get("/places/near", response_model=list[Place])
def read_root(latitude: float, longitude: float):
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    params = {
        "location": f"{latitude},{longitude}",
        "language": "ja",
        "maxprice": 3,
        "minprice": 0,
        "opennow": True,
        # "pagetoken": "",
        "rankby": "distance",
        # "radius": 500,
        "type": "restaurant",
        "key": key,
    }

    response = requests.get(url, params)
    data = AttrDict(response.json())
    
    places = []
    for result in data.results:
        location = result.geometry.location
        places.append({
            "name": result.name,
            "rating": result.rating,
            "vicinity": result.vicinity,
            "latitude": location.lat,
            "longitude": location.lng,
        })

    return places


@app.get("/places/{place_id}", response_model=Place)
def read_item(place_id: str):
    url = 'https://maps.googleapis.com/maps/api/place/details/json'
    params = {
      "place_id": place_id,
      "language": 'ja',
      "key": key,
    }

    response = requests.get(url, params)
    result = AttrDict(response.json()).result
    location = result.geometry.location

    place = {
        "id": result.place_id,
        "name": result.name,
        "rating": result.rating,
        "vicinity": result.vicinity,
        "latitude": location.lat,
        "longitude": location.lng,
    }

    return place


@app.get("/places/{place_id}/photos")
def read_item(place_id: str):
    url = 'https://maps.googleapis.com/maps/api/place/photo'
    params = {
        "photo_reference": 'Aap_uEDnz_WTtjeSoT06mpN-Yr6NuNoGVip9P74POPIyhLv0Kvr-GORZFWiSGCAf1UnQN29IElWm3J3_KyFw1zUd7IHkVTDDjcjtMp9vQkupTQt0b-BsKLvC6MotMONrakPg4g0Nb-lzhVp8znaorp3klzcdoZJjgamJXZZn6strL82BOIxG',
        "maxheight": 400,
        "maxwidth": 400,
        "key": key,
    }

    response = requests.get(url, params)
    result = AttrDict(response.json())
    print(result)
    return {}
