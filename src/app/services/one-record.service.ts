// import { Injectable } from '@angular/core';
// import { OcpHttpService, SessionStorageService } from '@ocp/ng-core';
// import { CDMP_REFERENCE_DATA_SERVICE_PATH } from '@ocp/ng-ocp-cdmp';
// import { Observable, EMPTY, of } from 'rxjs';
// import { map } from 'rxjs/operators';
//
//
// @Injectable()
// export class ReferenceDataService {
//
//   /**
//    * The base url of the CDMP reference data endpoint of our backend service
//    */
//   private readonly REFERENCE_DATA_URL = CDMP_REFERENCE_DATA_SERVICE_PATH;
//   // CDMP-6014 BEGIN
//   public cachedOperationalDiscrepanciesByMilestoneCode: { [milestoneCode: string]: Observable<Discrepancy[]> } = {
//     FWB: EMPTY,
//     FOH: EMPTY,
//     RCS: EMPTY,
//     DEP: EMPTY,
//     ARR: EMPTY,
//     RCF: EMPTY,
//     NFD: EMPTY,
//     DLV: EMPTY
//   };
//
//
//   constructor(private http: OcpHttpService,
//               private sessionStorage: SessionStorageService) {
//   }
//
//   // CDMP-6226 BEGIN
//   public getClient(): Observable<Client> {
//     if (this.cachedClient == EMPTY) {
//       this.cachedClient = this.http.get<Client>(this.REFERENCE_DATA_URL+'/client');
//     }
//     return this.cachedClient;
//   }
//   // CDMP-6226 END
//
//   // CDMP-5904 BEGIN
//   public getPartners(event: any, clientCode: string): Observable<Partner[]> {
//     let partnerC2kCodes: Partner[] = [];
//
//     if (this.cachedPartners == EMPTY) {
//       // CDMP-5953 BEGIN
//       // CDMP-6151 OneLiner
//       this.cachedPartners = this.http.get(this.REFERENCE_DATA_URL + '/partners/')
//         .pipe(
//           map((response: any) => {
//             return response['_embedded']['partnerResourceList'];
//           })
//         );
//       // CDMP-5953 END
//     }
//
//     return this.cachedPartners
//       .pipe(
//         map((response: Partner[]) => {
//           response.forEach((partner: Partner) => {
//             if (partner.c2kCode && !partnerC2kCodes.includes({
//               c2kCode: partner.c2kCode,
//               c2kName: partner.c2kName
//             })) {
//               // CDMP-5953 OneLiner
//               if (partner.c2kCode.toUpperCase().includes(event?.query?.toUpperCase()) || partner.c2kName.toUpperCase().includes(event?.query?.toUpperCase())) {
//                 partnerC2kCodes.push({
//                   c2kCode: partner.c2kCode,
//                   c2kName: partner.c2kName
//                 });
//               }
//             }
//           })
//           // CDMP-5953 OneLiner
//           partnerC2kCodes.sort((a, b) => a.c2kName.localeCompare(b.c2kName));
//           if (DropDownOptionEnum.ANY.toUpperCase().includes(event?.query.toUpperCase())) {
//             partnerC2kCodes.unshift({ c2kCode: DropDownOptionEnum.ANY, c2kName: null });
//           }
//           return partnerC2kCodes;
//         })
//       );
//   }
//   // CDMP-5904 END
//
//   // CDMP-5953 BEGIN
//   public getPartnerGroups(event: any, clientCode: string): Observable<PartnerGroup[]> {
//     const partnerGroups: PartnerGroup[] = [];
//
//     if (this.cachedPartnerGroups == EMPTY) {
//       // CDMP-5953 BEGIN
//       // CDMP-6151 OneLiner
//       this.cachedPartnerGroups = this.http.get(this.REFERENCE_DATA_URL + '/partners/groups')
//         .pipe(
//           map((response: any) => {
//             return response?._embedded?.partnerGroupResourceList;
//           })
//         );
//       // CDMP-5953 END
//     }
//
//     return this.cachedPartnerGroups
//       .pipe(
//         map((response: PartnerGroup[]) => {
//           response?.forEach((partnerGroup: PartnerGroup) => {
//             if (partnerGroup?.partnerGroup && !partnerGroups.includes({
//               partnerGroupId: partnerGroup.partnerGroupId,
//               partnerGroup: partnerGroup.partnerGroup
//             })) {
//               // CDMP-5953 OneLiner
//               if (partnerGroup.partnerGroup.toUpperCase().includes(event.query?.toUpperCase()) ||
//                 event.query?.toUpperCase() == DropDownOptionEnum.ALL.toUpperCase()) {
//                 partnerGroups.push({
//                   partnerGroupId: partnerGroup.partnerGroupId,
//                   partnerGroup: partnerGroup.partnerGroup
//                 });
//               }
//             }
//           })
//           partnerGroups.sort();
//           // CDMP-5953 BEGIN
//           if (DropDownOptionEnum.ALL.toUpperCase().includes(event.query?.toUpperCase())) {
//             partnerGroups.unshift({ partnerGroupId: null, partnerGroup: DropDownOptionEnum.ALL });
//           }
//           // CDMP-5953 END
//           return partnerGroups;
//         })
//       );
//   }
//   // CDMP-5953 END
//
//   // CDMP-5954 BEGIN
//   public getFlightCarrierCodes(event: any): Observable<FlightCarrierCode[]> {
//     const flightCarrierCodesList: FlightCarrierCode[] = [];
//     // CDMP-6151 OneLiner
//     return this.http.get(this.REFERENCE_DATA_URL + '/flights/carrierCodes/')
//       .pipe(
//         map((response: any) => {
//           if(response['_embedded']?.flightCarrierCodeResourceList){
//             response['_embedded']['flightCarrierCodeResourceList']?.forEach((flightCarrierCode: FlightCarrierCode)=> {
//               if (flightCarrierCode.flightCarrierCode &&
//                 !flightCarrierCodesList.includes({
//                   flightCarrierCode: flightCarrierCode.flightCarrierCode
//                 }) &&
//                 // CDMP-6084 OneLiner - add optional for event
//                 flightCarrierCode.flightCarrierCode.toUpperCase().includes(event?.query?.toUpperCase())) {
//                 flightCarrierCodesList.push({
//                   flightCarrierCode: flightCarrierCode.flightCarrierCode
//                 });
//               }
//             })
//             flightCarrierCodesList.sort();
//           }
//           return flightCarrierCodesList;
//         })
//       );
//   }
//
//   public getFlightGroups(event: any): Observable<FlightGroup[]> {
//     const flightGroupsList: FlightGroup[] = [];
//
//     // CDMP-6151 OneLiner
//     return this.http.get(this.REFERENCE_DATA_URL + '/flights/groups/')
//       .pipe(
//         map((response: any) => {
//           if(response['_embedded']?.flightGroupResourceList){
//             response['_embedded']['flightGroupResourceList']?.forEach((flightGroup: FlightGroup)=> {
//               if (flightGroup.flightGroup &&
//                 !flightGroupsList.includes({
//                   flightGroupId: flightGroup.flightGroupId,
//                   flightGroup: flightGroup.flightGroup
//                 }) &&
//                 // CDMP-6084 OneLiner - add optional to event
//                 flightGroup.flightGroup.toUpperCase().includes(event?.query?.toUpperCase()) ||
//                 event?.query?.toUpperCase() == DropDownOptionEnum.ALL.toUpperCase()) {
//                 flightGroupsList.push({
//                   flightGroupId: flightGroup.flightGroupId,
//                   flightGroup: flightGroup.flightGroup
//                 });
//               }
//             })
//             flightGroupsList.sort();
//           }
//           // CDMP-6084 OneLiner - add optional to event
//           if (DropDownOptionEnum.ALL.toUpperCase().includes(event?.query?.toUpperCase())){
//             flightGroupsList.unshift({ flightGroupId: null, flightGroup: DropDownOptionEnum.ALL });
//           }
//           return flightGroupsList;
//         })
//       );
//   }
//   // CDMP-5954 END
//
//   // CDMP-5955 BEGIN
//   public getProducts(event: any, clientCode: string): Observable<Product[]>
//   {
//     let productCodes: Product[] = [];
//
//     if (this.cachedProducts == EMPTY)
//     {
//       // CDMP-6151 OneLiner
//       this.cachedProducts = this.http.get(this.REFERENCE_DATA_URL + '/products')
//         .pipe(
//           map((response: any) => {
//             return response['_embedded']['productResourceList'];
//           })
//         );
//     }
//
//     return this.cachedProducts
//       .pipe(
//         map((response: Product[]) =>
//         {
//           response.forEach((product: Product) =>
//           {
//             if (product.productCode && !productCodes.includes({
//               productId: product.productId,
//               productCode: product.productCode }))
//             {
//               if (product.productCode.toUpperCase().includes(event.query.toUpperCase()))
//               {
//                 productCodes.push({ productId: product.productId, productCode: product.productCode });
//               }
//             }
//           })
//           productCodes.sort();
//           if (DropDownOptionEnum.NO_CODE.toUpperCase().includes(event.query.toUpperCase()))
//           {
//             productCodes.unshift({ productId: -1, productCode: DropDownOptionEnum.NO_CODE });
//           }
//           if (DropDownOptionEnum.ANY.toUpperCase().includes(event.query.toUpperCase()))
//           {
//             productCodes.unshift({ productId: null, productCode: DropDownOptionEnum.ANY });
//           }
//           return productCodes;
//         })
//       );
//   }
//
//   public getProductGroups(event: any, clientCode: string): Observable<ProductGroup[]>
//   {
//     const productGroups: ProductGroup[] = [];
//
//     if (this.cachedProductGroups == EMPTY)
//     {
//       // CDMP-6151 OneLiner
//       this.cachedProductGroups = this.http.get(this.REFERENCE_DATA_URL + '/products/groups')
//         .pipe(
//           map((response: any) => {
//             return response['_embedded']['productGroupResourceList'];
//           })
//         );
//     }
//
//     return this.cachedProductGroups
//       .pipe(
//         map((response: ProductGroup[]) =>
//         {
//           response.forEach((productGroup: ProductGroup) =>
//           {
//             if (productGroup.productGroup && !productGroups.includes({
//               productGroupId: productGroup.productGroupId,
//               productGroup: productGroup.productGroup }))
//             {
//               if (productGroup.productGroup.toUpperCase().includes(event.query?.toUpperCase()) ||
//                 event.query?.toUpperCase() == DropDownOptionEnum.ALL.toUpperCase())
//               {
//                 productGroups.push({
//                   productGroupId: productGroup.productGroupId,
//                   productGroup: productGroup.productGroup }
//                 );
//               }
//             }
//           })
//           productGroups.sort();
//
//           if (DropDownOptionEnum.ALL.toUpperCase().includes(event.query?.toUpperCase()))
//           {
//             productGroups.unshift({ productGroupId: null, productGroup: DropDownOptionEnum.ALL });
//           }
//           return productGroups;
//         })
//       );
//   }
//   // CDMP-5955 END
//
//   //CDMP-5956 BEGIN
//   public getSphCodes( c2kCode: string, event?: any): Observable<Sph[]>{
//     // CDMP-6151 OneLiner
//     return this.http.get(this.REFERENCE_DATA_URL+'/sph')
//       .pipe(
//         map((response: any)=>{
//           if(response['_embedded']?.sphResourceList) {
//             const sphResourceList = response['_embedded']['sphResourceList'];
//             if(event) {
//               let sphCodes: Sph[] = [];
//               sphResourceList.forEach((element) => {
//                 if (element && !sphCodes.includes({ code: element.code }) &&
//                   element.code.includes(event.query.toUpperCase())) {
//                   sphCodes.push(element);
//                 }
//               })
//               if (DropDownOptionEnum.ANY.toLowerCase().includes(event.query.toLowerCase())) {
//                 sphCodes.unshift({ code: DropDownOptionEnum.ANY });
//               }
//               return sphCodes;
//             }
//             return sphResourceList;
//           }
//           return [];
//         })
//       )
//   }
//   //CDMP-5956
//
// }
