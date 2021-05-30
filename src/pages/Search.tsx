import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { SearchbarChangeEventDetail } from "@ionic/core";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonSpinner,
  IonText,
  IonIcon,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { locateOutline, reloadCircleOutline } from "ionicons/icons";

import { placeRequest } from "../requests/place";
import { PlaceDetail } from "../components/PlaceDetail";

import "./Search.scss";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [detail, setDetail] = useState<PlaceDetail | undefined>(void 0);
  const handleChangeQuery = useCallback((event: CustomEvent<SearchbarChangeEventDetail>) => {
    setQuery(event.detail.value ?? "");
  }, []);
  const handleChangeMaxDistance = useCallback((event: CustomEvent<SearchbarChangeEventDetail>) => {
    setMaxDistance(event.detail.value ?? "5");
  }, []);

  const { data, isFetching, isError, isSuccess, refetch } = useQuery(
    ["place", query, maxDistance],
    async () => {
      return (await placeRequest(query, maxDistance)).json();
    },
    {
      enabled: !!query.trim() && !Number.isNaN(Number(maxDistance)),
    }
  );

  const payload = data as PlaceResponse;

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
        {isFetching && (
          <div className="fetching">
            <IonSpinner name="dots" />
            <IonText>Đang tìm kiếm</IonText>
          </div>
        )}
        {isError && (
          <div className="error">
            <h2 onClick={() => refetch()}>
              <IonIcon icon={reloadCircleOutline} />
              &nbsp;Thử lại
            </h2>
            <IonText>Đã xảy ra lỗi khi tìm kiếm</IonText>
          </div>
        )}
        {isSuccess && (
          <IonList>
            <IonListHeader>
              {payload.count > 0 ? `Tìm thấy ${payload.count} kết quả` : `Không tìm thấy kết quả nào`}
            </IonListHeader>
            <PlaceDetail detail={detail} onDismiss={() => setDetail(void 0)} />
            {payload.docs.map((resultItem) => {
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
