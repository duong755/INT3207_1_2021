import React, { useCallback, useEffect, useState } from "react";
import { SearchbarChangeEventDetail } from "@ionic/core";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { locateOutline } from "ionicons/icons";

import { placeRequest } from "../requests/place";
import { PlaceDetail } from "../components/PlaceDetail";

import "./Search.scss";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [detail, setDetail] = useState<PlaceDetail | undefined>(void 0);
  const [response, setResponse] = useState<PlaceResponse | undefined>();
  const handleChangeQuery = useCallback((event: CustomEvent<SearchbarChangeEventDetail>) => {
    setQuery(event.detail.value ?? "");
  }, []);
  const handleChangeMaxDistance = useCallback((event: CustomEvent<SearchbarChangeEventDetail>) => {
    setMaxDistance(event.detail.value ?? "5");
  }, []);

  useEffect(() => {
    if (query.trim() && !Number.isNaN(Number(maxDistance))) {
      (async () => {
        const res = await placeRequest(query, maxDistance);
        const json: PlaceResponse = await res.json();
        setResponse(json);
      })();
    }
  }, [query, maxDistance]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar value={query} onIonChange={handleChangeQuery} />
          <IonSearchbar
            searchIcon={locateOutline}
            placeholder="Bán kính tìm kiếm (km)"
            value={maxDistance}
            onIonChange={handleChangeMaxDistance}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {response && (
          <IonList>
            <IonListHeader>
              {response.count > 0 ? `Tìm thấy ${response.count} kết quả` : `Không tìm thấy kết quả nào`}
            </IonListHeader>
            <PlaceDetail detail={detail} onDismiss={() => setDetail(void 0)} />
            {response.docs.map((resultItem) => {
              return (
                <IonItem key={resultItem.place_name} onClick={() => setDetail(resultItem)}>
                  <IonThumbnail slot="start">
                    <IonImg src={resultItem.prodct_image} />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{resultItem.place_name}</h2>
                    <p>{resultItem.place_address}</p>
                    <IonRouterLink target="_blank" href={resultItem.place_info_url}>
                      {resultItem.place_info_url}
                    </IonRouterLink>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

Search.displayName = "SearchPage";

export default Search;
