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
} from "@ionic/react";
import { reloadCircleOutline } from "ionicons/icons";

import { place } from "../axios/place";

import "./Search.scss";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const handleChangeQuery = useCallback((event: CustomEvent<SearchbarChangeEventDetail>) => {
    setQuery(event.detail.value ?? "");
  }, []);

  const { data, isFetching, isError, isSuccess, refetch } = useQuery(
    ["place", query],
    () => {
      return place.get("/place", {
        params: {
          q: query,
          maxDistance: 0.5,
        },
      });
    },
    {
      enabled: !!query.trim(),
    }
  );

  const payload = data?.data as PlaceResponse;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar value={query} onIonChange={handleChangeQuery} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isFetching && (
          <div className="fetching">
            <IonSpinner name="dots" />
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
            {payload.docs.map((resultItem) => {
              return (
                <IonItem key={resultItem._id}>
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
