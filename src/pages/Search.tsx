import React, { useCallback, useState } from "react";
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
  IonSpinner,
  IonText,
  IonIcon,
  IonLabel,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { locateOutline, reloadCircleOutline } from "ionicons/icons";
import { useQuery } from "react-query";
import { Geolocation, Permissions, PermissionType } from "@capacitor/core";

import { place } from "../axios/place";
import { removeAccents } from "../helpers/removeAccents";
import { PlaceDetail } from "../components/PlaceDetail";

import "./Search.scss";
import { AxiosResponse } from "axios";

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

  const { data, isFetching, isError, isSuccess, refetch, error } = useQuery<AxiosResponse<any>, Error>(
    ["place", query, maxDistance],
    async () => {
      const result = await Permissions.query({ name: PermissionType.Geolocation });
      if (result.state === "denied") {
        throw new Error("Hãy bật vị trí để sử dụng tính năng tìm kiếm");
      }
      const {
        coords: { latitude, longitude },
      } = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      return place.get("/place", {
        params: {
          q: removeAccents(query),
          maxDistance: maxDistance,
          latitude,
          longitude,
        },
      });
    },
    {
      enabled: !!query.trim() && !Number.isNaN(Number(maxDistance)),
    }
  );

  const payload = data?.data as PlaceResponse;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar
            searchIcon={locateOutline}
            placeholder="Bán kính tìm kiếm (km)"
            value={maxDistance}
            onIonChange={handleChangeMaxDistance}
          />
          <IonSearchbar onIonChange={handleChangeQuery} placeholder="Tìm kiếm sản phẩm..." />
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
            <IonText>{error?.message}</IonText>
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
                <IonItem key={resultItem._id} onClick={() => setDetail(resultItem)}>
                  <IonThumbnail slot="start">
                    <IonImg src={resultItem.prodct_image} />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{resultItem.product}</h2>
                    <p>{resultItem.place_address}</p>
                    <p>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(resultItem.product_price)}</p>
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
