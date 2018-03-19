# leForem Api Node.js Wrapper

## Synopsis

This projects helps you to make HTTP requests to the Forem API.


## Installation

```sh
npm install leforem-node
```

```javasctipt
var v = require('leforem-node');
```

```javasctipt
// Public API

var client = new foremclient();

```

## SNCF API

The forem Api is the open API for building cool stuff with jobs data. 

Forem api datasets are accessible by developers through an HTTP REST API.


## API Index
The API is not available 


## Methods

* [search](#search)
* [stream](#stream)



### search

**Response**

```javasctipt
[ 
  { author: 'anonymous',
      contractType: 'N',
      description: '<acse:Abstract xmlns="http://www.acse.be/portal"><P>Dans le cadre de nos projets clients et du renforcement de nos équipes, nous recherchons actuellement des Développeurs Java juniors et expérimentés afin d\'intervenir sur les missions suivantes :<BR/>Participer à l\'analyse et à la conception technique<BR/>Développer et maintenir les applications<BR/>Réaliser des tests et participer aux phases de livraison et documentation                              </P></acse:Abstract>',
      id: 'I30133506',
      languageCodes: [],
      lastPublication: 1521470306000,
      lastUpdate: '19 mars 2018',
      location: 'NAMUR',
      nbJobs: '1',
      owner: 'Le Forem',
      permisCodes: [],
      ref: '2242853',
      title: 'DÉVELOPPEURS JAVA SENIORS ET JUNIORS (H/F) [NAMUR]',
      xpInMonth: 0 
    } 
]
```

**Examples**
Request:
    /search

    param: 
    location: Information about region : 
    Value Region  : WAL(Wallonie)VLG(Région Flammande),BE-WLG(Région Liege),BE-VAN,(Région Anvers),BE-WNA(Régioun Namur),BE-WHT(Région Hainaut),BE-WBR(Brabant-Wallon),BE-VWV(Flandre Occidental),BE-VOV(Flandre Orientale),BE-VLI(Limbourg)
    Value Ville :DIN(Dinant),PHI(Philippeville),VIR(Virton),NEU(Neufchateau),BAS(Bastogne),BE-WLX(Luxembourg),WAR(Waremme),VER(Verviers),HUY(HUY),LIE(Liege),TOU(Tournai),THU(Thuin),SOI(Soignies),MOU(Mouscron),HAS(Hasselt),GAN(GAND),OOS(Ostende),AAL(Alost),IEP(Ypres),KOR(Courtrai),BRG(Bruges),LEU(Louvain),MEC(Malines),TUR(Turnhout),SIN(Saint-Nicolas),ROE(Roulers),TON(Tongres)

    query:Information about jobs
    resultat: number of resultat per page
    page : number of page

```javasctipt
client.search(resultat,page,q,location,function (error, data,count,page,resultat) {
  if(error) console.log("E!",error)
  console.dir(data);
});

```


### Stream

**Response**

```javasctipt
[ 
  { author: 'anonymous',
      contractType: 'N',
      description: '<acse:Abstract xmlns="http://www.acse.be/portal"><P>Dans le cadre de nos projets clients et du renforcement de nos équipes, nous recherchons actuellement des Développeurs Java juniors et expérimentés afin d\'intervenir sur les missions suivantes :<BR/>Participer à l\'analyse et à la conception technique<BR/>Développer et maintenir les applications<BR/>Réaliser des tests et participer aux phases de livraison et documentation                              </P></acse:Abstract>',
      id: 'I30133506',
      languageCodes: [],
      lastPublication: 1521470306000,
      lastUpdate: '19 mars 2018',
      location: 'NAMUR',
      nbJobs: '1',
      owner: 'Le Forem',
      permisCodes: [],
      ref: '2242853',
      title: 'DÉVELOPPEURS JAVA SENIORS ET JUNIORS (H/F) [NAMUR]',
      xpInMonth: 0 
    } 
]
```

**Examples**
Request:
    /stream (only last 10 offers with timeout 30s)

    param: 
    location: Information about region : 
    Value Region  : WAL(Wallonie)VLG(Région Flammande),BE-WLG(Région Liege),BE-VAN,(Région Anvers),BE-WNA(Régioun Namur),BE-WHT(Région Hainaut),BE-WBR(Brabant-Wallon),BE-VWV(Flandre Occidental),BE-VOV(Flandre Orientale),BE-VLI(Limbourg)
    Value Ville :DIN(Dinant),PHI(Philippeville),VIR(Virton),NEU(Neufchateau),BAS(Bastogne),BE-WLX(Luxembourg),WAR(Waremme),VER(Verviers),HUY(HUY),LIE(Liege),TOU(Tournai),THU(Thuin),SOI(Soignies),MOU(Mouscron),HAS(Hasselt),GAN(GAND),OOS(Ostende),AAL(Alost),IEP(Ypres),KOR(Courtrai),BRG(Bruges),LEU(Louvain),MEC(Malines),TUR(Turnhout),SIN(Saint-Nicolas),ROE(Roulers),TON(Tongres)

    query:Information about jobs

```javasctipt
client.stream(q,location,function (data,count,timestamp) {
  console.dir(data);
});

```

## API Reference

https://www.leforem.be 

## Contributors

Anis Haboubi

## License

See [LICENSE.txt](LICENSE.txt) for more info.