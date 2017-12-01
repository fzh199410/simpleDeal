/**
 * Created by zuilafeng on 2017/7/13.
 */
import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';

var sichuanAreas = [
    {"code":"510000","parentCode":"0","level":"1","name":"四川省","latitude":"0.367481","longitude":"102.89916"},
    {"code":"510100","parentCode":"510000","level":"2","name":"成都市","latitude":"30.679943","longitude":"104.067923"},
    {"code":"510101","parentCode":"510100","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510104","parentCode":"510100","level":"3","name":"锦江区","latitude":"30.606302","longitude":"104.124269"},
    {"code":"510105","parentCode":"510100","level":"3","name":"青羊区","latitude":"30.685102","longitude":"103.988429"},
    {"code":"510106","parentCode":"510100","level":"3","name":"金牛区","latitude":"30.735622","longitude":"104.061377"},
    {"code":"510107","parentCode":"510100","level":"3","name":"武侯区","latitude":"0.612882","longitude":"104.04124"},
    {"code":"510108","parentCode":"510100","level":"3","name":"成华区","latitude":"30.69504","longitude":"104.150032"},
    {"code":"510112","parentCode":"510100","level":"3","name":"龙泉驿区","latitude":"30.603368","longitude":"104.301181"},
    {"code":"510113","parentCode":"510100","level":"3","name":"青白江区","latitude":"0.796354","longitude":"104.34643"},
    {"code":"510114","parentCode":"510100","level":"3","name":"新都区","latitude":"30.839504","longitude":"104.116583"},
    {"code":"510115","parentCode":"510100","level":"3","name":"温江区","latitude":"","longitude":""},
    {"code":"510121","parentCode":"510100","level":"3","name":"金堂县","latitude":"30.728613","longitude":"104.615371"},
    {"code":"510122","parentCode":"510100","level":"3","name":"双流县","latitude":"30.459478","longitude":"104.040899"},
    {"code":"510124","parentCode":"510100","level":"3","name":"郫县","latitude":"30.839642","longitude":"103.884625"},
    {"code":"510129","parentCode":"510100","level":"3","name":"大邑县","latitude":"30.614941","longitude":"103.388452"},
    {"code":"510131","parentCode":"510100","level":"3","name":"蒲江县","latitude":"30.239939","longitude":"103.497738"},
    {"code":"510132","parentCode":"510100","level":"3","name":"新津县","latitude":"30.427866","longitude":"103.832177"},
    {"code":"510181","parentCode":"510100","level":"3","name":"都江堰市","latitude":"31.039124","longitude":"103.637342"},
    {"code":"510182","parentCode":"510100","level":"3","name":"彭州市","latitude":"31.148577","longitude":"103.889866"},
    {"code":"510183","parentCode":"510100","level":"3","name":"邛崃市","latitude":"30.388736","longitude":"103.376512"},
    {"code":"510184","parentCode":"510100","level":"3","name":"崇州市","latitude":"30.719641","longitude":"103.529467"},
    {"code":"510300","parentCode":"510000","level":"2","name":"自贡市","latitude":"29.359157","longitude":"104.776071"},
    {"code":"510301","parentCode":"510300","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510302","parentCode":"510300","level":"3","name":"自流井区","latitude":"29.282614","longitude":"104.707854"},
    {"code":"510303","parentCode":"510300","level":"3","name":"贡井区","latitude":"29.314591","longitude":"104.602735"},
    {"code":"510304","parentCode":"510300","level":"3","name":"大安区","latitude":"29.411548","longitude":"104.877566"},
    {"code":"510311","parentCode":"510300","level":"3","name":"沿滩区","latitude":"29.24264","longitude":"104.854763"},
    {"code":"510321","parentCode":"510300","level":"3","name":"荣县","latitude":"29.398978","longitude":"104.372408"},
    {"code":"510322","parentCode":"510300","level":"3","name":"富顺县","latitude":"9.152297","longitude":"105.02222"},
    {"code":"510400","parentCode":"510000","level":"2","name":"攀枝花市","latitude":"26.587571","longitude":"101.722423"},
    {"code":"510401","parentCode":"510400","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510402","parentCode":"510400","level":"3","name":"东区","latitude":"22.276112","longitude":"114.235394"},
    {"code":"510403","parentCode":"510400","level":"3","name":"西区","latitude":"26.610869","longitude":"101.555332"},
    {"code":"510411","parentCode":"510400","level":"3","name":"仁和区","latitude":"26.567907","longitude":"101.669702"},
    {"code":"510421","parentCode":"510400","level":"3","name":"米易县","latitude":"26.932749","longitude":"102.000726"},
    {"code":"510422","parentCode":"510400","level":"3","name":"盐边县","latitude":"6.940087","longitude":"101.58605"},
    {"code":"510500","parentCode":"510000","level":"2","name":"泸州市","latitude":"28.89593","longitude":"105.44397"},
    {"code":"510501","parentCode":"510500","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510502","parentCode":"510500","level":"3","name":"江阳区","latitude":"28.876901","longitude":"105.371713"},
    {"code":"510503","parentCode":"510500","level":"3","name":"纳溪区","latitude":"28.614041","longitude":"105.390606"},
    {"code":"510504","parentCode":"510500","level":"3","name":"龙马潭区","latitude":"28.98746","longitude":"105.437842"},
    {"code":"510521","parentCode":"510500","level":"3","name":"泸县","latitude":"29.12492","longitude":"105.508267"},
    {"code":"510522","parentCode":"510500","level":"3","name":"合江县","latitude":".751865","longitude":"105.9316"},
    {"code":"510524","parentCode":"510500","level":"3","name":"叙永县","latitude":"28.099207","longitude":"105.468592"},
    {"code":"510525","parentCode":"510500","level":"3","name":"古蔺县","latitude":"27.983319","longitude":"105.936293"},
    {"code":"510600","parentCode":"510000","level":"2","name":"德阳市","latitude":"31.13114","longitude":"104.402398"},
    {"code":"510601","parentCode":"510600","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510603","parentCode":"510600","level":"3","name":"旌阳区","latitude":"31.179805","longitude":"104.415258"},
    {"code":"510623","parentCode":"510600","level":"3","name":"中江县","latitude":"30.887114","longitude":"104.804952"},
    {"code":"510626","parentCode":"510600","level":"3","name":"罗江县","latitude":"1.320265","longitude":"104.53541"},
    {"code":"510681","parentCode":"510600","level":"3","name":"广汉市","latitude":"31.006481","longitude":"104.298476"},
    {"code":"510682","parentCode":"510600","level":"3","name":"什邡市","latitude":"31.293694","longitude":"104.019871"},
    {"code":"510683","parentCode":"510600","level":"3","name":"绵竹市","latitude":"31.436657","longitude":"104.129294"},
    {"code":"510700","parentCode":"510000","level":"2","name":"绵阳市","latitude":"31.504701","longitude":"104.705519"},
    {"code":"510701","parentCode":"510700","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510703","parentCode":"510700","level":"3","name":"涪城区","latitude":"31.435735","longitude":"104.670514"},
    {"code":"510704","parentCode":"510700","level":"3","name":"游仙区","latitude":"1.518816","longitude":"104.98158"},
    {"code":"510722","parentCode":"510700","level":"3","name":"三台县","latitude":"31.118872","longitude":"105.042581"},
    {"code":"510723","parentCode":"510700","level":"3","name":"盐亭县","latitude":"31.247943","longitude":"105.479071"},
    {"code":"510724","parentCode":"510700","level":"3","name":"安县","latitude":"31.589182","longitude":"104.368786"},
    {"code":"510725","parentCode":"510700","level":"3","name":"梓潼县","latitude":"31.653621","longitude":"105.193834"},
    {"code":"510726","parentCode":"510700","level":"3","name":"北川县","latitude":"","longitude":""},
    {"code":"510727","parentCode":"510700","level":"3","name":"平武县","latitude":"32.446912","longitude":"104.404308"},
    {"code":"510781","parentCode":"510700","level":"3","name":"江油市","latitude":"31.952427","longitude":"104.933149"},
    {"code":"510800","parentCode":"510000","level":"2","name":"广元市","latitude":"32.44104","longitude":"105.819687"},
    {"code":"510801","parentCode":"510800","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510802","parentCode":"510800","level":"3","name":"利州区","latitude":"","longitude":""},
    {"code":"510811","parentCode":"510800","level":"3","name":"元坝区","latitude":"32.149903","longitude":"105.883379"},
    {"code":"510812","parentCode":"510800","level":"3","name":"朝天区","latitude":"32.708417","longitude":"106.022164"},
    {"code":"510821","parentCode":"510800","level":"3","name":"旺苍县","latitude":"32.37214","longitude":"106.401823"},
    {"code":"510822","parentCode":"510800","level":"3","name":"青川县","latitude":"32.51586","longitude":"105.190447"},
    {"code":"510823","parentCode":"510800","level":"3","name":"剑阁县","latitude":"31.921948","longitude":"105.503021"},
    {"code":"510824","parentCode":"510800","level":"3","name":"苍溪县","latitude":"31.918552","longitude":"106.113283"},
    {"code":"510900","parentCode":"510000","level":"2","name":"遂宁市","latitude":"30.557491","longitude":"105.564888"},
    {"code":"510901","parentCode":"510900","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"510903","parentCode":"510900","level":"3","name":"船山区","latitude":"","longitude":""},
    {"code":"510904","parentCode":"510900","level":"3","name":"安居区","latitude":"","longitude":""},
    {"code":"510921","parentCode":"510900","level":"3","name":"蓬溪县","latitude":"30.657491","longitude":"105.716088"},
    {"code":"510922","parentCode":"510900","level":"3","name":"射洪县","latitude":"30.908079","longitude":"105.388245"},
    {"code":"510923","parentCode":"510900","level":"3","name":"大英县","latitude":"30.580191","longitude":"105.256372"},
    {"code":"511000","parentCode":"510000","level":"2","name":"内江市","latitude":"29.599462","longitude":"105.073056"},
    {"code":"511001","parentCode":"511000","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511002","parentCode":"511000","level":"3","name":"市中区","latitude":"36.656617","longitude":"117.002545"},
    {"code":"511011","parentCode":"511000","level":"3","name":"东兴区","latitude":"29.628089","longitude":"105.202169"},
    {"code":"511024","parentCode":"511000","level":"3","name":"威远县","latitude":"29.599589","longitude":"104.593976"},
    {"code":"511025","parentCode":"511000","level":"3","name":"资中县","latitude":"29.813836","longitude":"104.807466"},
    {"code":"511028","parentCode":"511000","level":"3","name":"隆昌县","latitude":"29.367869","longitude":"105.252958"},
    {"code":"511100","parentCode":"510000","level":"2","name":"乐山市","latitude":"29.600958","longitude":"103.760824"},
    {"code":"511101","parentCode":"511100","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511102","parentCode":"511100","level":"3","name":"市中区","latitude":"36.656617","longitude":"117.002545"},
    {"code":"511111","parentCode":"511100","level":"3","name":"沙湾区","latitude":"29.31641","longitude":"103.604548"},
    {"code":"511112","parentCode":"511100","level":"3","name":"五通桥区","latitude":"29.395444","longitude":"103.846633"},
    {"code":"511113","parentCode":"511100","level":"3","name":"金口河区","latitude":"29.29382","longitude":"103.073366"},
    {"code":"511123","parentCode":"511100","level":"3","name":"犍为县","latitude":"29.23119","longitude":"103.980199"},
    {"code":"511124","parentCode":"511100","level":"3","name":"井研县","latitude":"9.644501","longitude":"104.05533"},
    {"code":"511126","parentCode":"511100","level":"3","name":"夹江县","latitude":"29.776107","longitude":"103.559263"},
    {"code":"511129","parentCode":"511100","level":"3","name":"沐川县","latitude":"29.006905","longitude":"103.826503"},
    {"code":"511132","parentCode":"511100","level":"3","name":"峨边县","latitude":"9.050416","longitude":"103.21674"},
    {"code":"511133","parentCode":"511100","level":"3","name":"马边县","latitude":"28.776739","longitude":"103.481388"},
    {"code":"511181","parentCode":"511100","level":"3","name":"峨眉山市","latitude":"29.507004","longitude":"103.400912"},
    {"code":"511300","parentCode":"510000","level":"2","name":"南充市","latitude":"30.800965","longitude":"106.105554"},
    {"code":"511301","parentCode":"511300","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511302","parentCode":"511300","level":"3","name":"顺庆区","latitude":"30.949625","longitude":"106.115798"},
    {"code":"511303","parentCode":"511300","level":"3","name":"高坪区","latitude":"30.754684","longitude":"106.259759"},
    {"code":"511304","parentCode":"511300","level":"3","name":"嘉陵区","latitude":"30.665452","longitude":"105.938703"},
    {"code":"511321","parentCode":"511300","level":"3","name":"南部县","latitude":"31.349803","longitude":"105.923514"},
    {"code":"511322","parentCode":"511300","level":"3","name":"营山县","latitude":"31.162323","longitude":"106.718527"},
    {"code":"511323","parentCode":"511300","level":"3","name":"蓬安县","latitude":"31.007076","longitude":"106.428917"},
    {"code":"511324","parentCode":"511300","level":"3","name":"仪陇县","latitude":"31.443593","longitude":"106.534725"},
    {"code":"511325","parentCode":"511300","level":"3","name":"西充县","latitude":"31.063877","longitude":"105.857332"},
    {"code":"511381","parentCode":"511300","level":"3","name":"阆中市","latitude":"31.602117","longitude":"106.078093"},
    {"code":"511400","parentCode":"510000","level":"2","name":"眉山市","latitude":"30.061115","longitude":"103.84143"},
    {"code":"511401","parentCode":"511400","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511402","parentCode":"511400","level":"3","name":"东坡区","latitude":"30.057372","longitude":"103.748333"},
    {"code":"511421","parentCode":"511400","level":"3","name":"仁寿县","latitude":"29.985869","longitude":"104.225519"},
    {"code":"511422","parentCode":"511400","level":"3","name":"彭山县","latitude":"30.254453","longitude":"103.865691"},
    {"code":"511423","parentCode":"511400","level":"3","name":"洪雅县","latitude":"29.694316","longitude":"103.180159"},
    {"code":"511424","parentCode":"511400","level":"3","name":"丹棱县","latitude":"30.014803","longitude":"103.434513"},
    {"code":"511425","parentCode":"511400","level":"3","name":"青神县","latitude":"29.82276","longitude":"103.837508"},
    {"code":"511500","parentCode":"510000","level":"2","name":"宜宾市","latitude":"28.769675","longitude":"104.633019"},
    {"code":"511501","parentCode":"511500","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511502","parentCode":"511500","level":"3","name":"翠屏区","latitude":"28.81582","longitude":"104.693255"},
    {"code":"511503","parentCode":"511500","level":"3","name":"南溪区","latitude":"","longitude":""},
    {"code":"511521","parentCode":"511500","level":"3","name":"宜宾县","latitude":"8.906871","longitude":"104.38271"},
    {"code":"511523","parentCode":"511500","level":"3","name":"江安县","latitude":"28.663533","longitude":"105.128778"},
    {"code":"511524","parentCode":"511500","level":"3","name":"长宁县","latitude":"28.515434","longitude":"104.931149"},
    {"code":"511525","parentCode":"511500","level":"3","name":"高县","latitude":"28.4632","longitude":"104.593066"},
    {"code":"511526","parentCode":"511500","level":"3","name":"珙县","latitude":"28.19699","longitude":"104.806618"},
    {"code":"511527","parentCode":"511500","level":"3","name":"筠连县","latitude":"28.042099","longitude":"104.588433"},
    {"code":"511528","parentCode":"511500","level":"3","name":"兴文县","latitude":"28.255538","longitude":"105.141226"},
    {"code":"511529","parentCode":"511500","level":"3","name":"屏山县","latitude":"28.702429","longitude":"103.999118"},
    {"code":"511600","parentCode":"510000","level":"2","name":"广安市","latitude":"30.463984","longitude":"106.63572"},
    {"code":"511601","parentCode":"511600","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511602","parentCode":"511600","level":"3","name":"广安区","latitude":"30.59925","longitude":"106.758912"},
    {"code":"511603","parentCode":"511600","level":"3","name":"前锋区","latitude":"","longitude":""},
    {"code":"511621","parentCode":"511600","level":"3","name":"岳池县","latitude":"30.540769","longitude":"106.420833"},
    {"code":"511622","parentCode":"511600","level":"3","name":"武胜县","latitude":"30.373905","longitude":"106.231366"},
    {"code":"511623","parentCode":"511600","level":"3","name":"邻水县","latitude":"30.263284","longitude":"107.003334"},
    {"code":"511681","parentCode":"511600","level":"3","name":"华蓥市","latitude":"","longitude":""},
    {"code":"511700","parentCode":"510000","level":"2","name":"达州市","latitude":"31.214199","longitude":"107.494973"},
    {"code":"511701","parentCode":"511700","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511702","parentCode":"511700","level":"3","name":"通川区","latitude":"31.238764","longitude":"107.519204"},
    {"code":"511703","parentCode":"511700","level":"3","name":"达川区","latitude":"","longitude":""},
    {"code":"511722","parentCode":"511700","level":"3","name":"宣汉县","latitude":"31.519798","longitude":"107.936033"},
    {"code":"511723","parentCode":"511700","level":"3","name":"开江县","latitude":"31.051587","longitude":"107.891012"},
    {"code":"511724","parentCode":"511700","level":"3","name":"大竹县","latitude":"30.690772","longitude":"107.279877"},
    {"code":"511725","parentCode":"511700","level":"3","name":"渠县","latitude":"30.948814","longitude":"106.987602"},
    {"code":"511781","parentCode":"511700","level":"3","name":"万源市","latitude":"31.986241","longitude":"107.993811"},
    {"code":"511800","parentCode":"510000","level":"2","name":"雅安市","latitude":"29.999716","longitude":"103.009356"},
    {"code":"511801","parentCode":"511800","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511802","parentCode":"511800","level":"3","name":"雨城区","latitude":"29.928507","longitude":"103.038405"},
    {"code":"511803","parentCode":"511800","level":"3","name":"名山区","latitude":"","longitude":""},
    {"code":"511822","parentCode":"511800","level":"3","name":"荥经县","latitude":"29.740878","longitude":"102.691946"},
    {"code":"511823","parentCode":"511800","level":"3","name":"汉源县","latitude":"29.431576","longitude":"102.625136"},
    {"code":"511824","parentCode":"511800","level":"3","name":"石棉县","latitude":"9.235485","longitude":"102.29397"},
    {"code":"511825","parentCode":"511800","level":"3","name":"天全县","latitude":"30.078875","longitude":"102.578305"},
    {"code":"511826","parentCode":"511800","level":"3","name":"芦山县","latitude":"30.440282","longitude":"103.018099"},
    {"code":"511827","parentCode":"511800","level":"3","name":"宝兴县","latitude":"30.56765","longitude":"102.716894"},
    {"code":"511900","parentCode":"510000","level":"2","name":"巴中市","latitude":"31.869189","longitude":"106.757916"},
    {"code":"511901","parentCode":"511900","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"511902","parentCode":"511900","level":"3","name":"巴州区","latitude":"31.785303","longitude":"106.739266"},
    {"code":"511903","parentCode":"511900","level":"3","name":"恩阳区","latitude":"","longitude":""},
    {"code":"511921","parentCode":"511900","level":"3","name":"通江县","latitude":"32.136407","longitude":"107.352775"},
    {"code":"511922","parentCode":"511900","level":"3","name":"南江县","latitude":"32.337239","longitude":"106.836181"},
    {"code":"511923","parentCode":"511900","level":"3","name":"平昌县","latitude":"31.597715","longitude":"107.167357"},
    {"code":"512000","parentCode":"510000","level":"2","name":"资阳市","latitude":"30.132191","longitude":"104.63593"},
    {"code":"512001","parentCode":"512000","level":"3","name":"市辖区","latitude":"","longitude":""},
    {"code":"512002","parentCode":"512000","level":"3","name":"雁江区","latitude":"30.091647","longitude":"104.755417"},
    {"code":"512021","parentCode":"512000","level":"3","name":"安岳县","latitude":"29.999677","longitude":"105.400876"},
    {"code":"512022","parentCode":"512000","level":"3","name":"乐至县","latitude":"30.313945","longitude":"105.028316"},
    {"code":"512081","parentCode":"512000","level":"3","name":"简阳市","latitude":"30.393006","longitude":"104.536305"},
    {"code":"513200","parentCode":"510000","level":"2","name":"阿坝州","latitude":"31.905763","longitude":"102.228565"},
    {"code":"513221","parentCode":"513200","level":"3","name":"汶川县","latitude":"31.168774","longitude":"103.294317"},
    {"code":"513222","parentCode":"513200","level":"3","name":"理县","latitude":"31.579557","longitude":"103.021281"},
    {"code":"513223","parentCode":"513200","level":"3","name":"茂县","latitude":"31.855708","longitude":"103.635043"},
    {"code":"513224","parentCode":"513200","level":"3","name":"松潘县","latitude":"32.625459","longitude":"103.532712"},
    {"code":"513225","parentCode":"513200","level":"3","name":"九寨沟县","latitude":"33.317446","longitude":"103.934044"},
    {"code":"513226","parentCode":"513200","level":"3","name":"金川县","latitude":"31.52757","longitude":"101.804769"},
    {"code":"513227","parentCode":"513200","level":"3","name":"小金县","latitude":"31.135396","longitude":"102.475493"},
    {"code":"513228","parentCode":"513200","level":"3","name":"黑水县","latitude":"32.16531","longitude":"103.055487"},
    {"code":"513229","parentCode":"513200","level":"3","name":"马尔康县","latitude":"32.019304","longitude":"102.023305"},
    {"code":"513230","parentCode":"513200","level":"3","name":"壤塘县","latitude":"32.148226","longitude":"101.059717"},
    {"code":"513231","parentCode":"513200","level":"3","name":"阿坝县","latitude":"32.890762","longitude":"101.787569"},
    {"code":"513232","parentCode":"513200","level":"3","name":"若尔盖县","latitude":"33.668819","longitude":"102.895582"},
    {"code":"513233","parentCode":"513200","level":"3","name":"红原县","latitude":"2.736132","longitude":"102.64115"},
    {"code":"513300","parentCode":"510000","level":"2","name":"甘孜州","latitude":"30.055144","longitude":"101.969232"},
    {"code":"513321","parentCode":"513300","level":"3","name":"康定县","latitude":"29.957989","longitude":"101.755331"},
    {"code":"513322","parentCode":"513300","level":"3","name":"泸定县","latitude":"29.747744","longitude":"102.120066"},
    {"code":"513323","parentCode":"513300","level":"3","name":"丹巴县","latitude":"30.967074","longitude":"101.752398"},
    {"code":"513324","parentCode":"513300","level":"3","name":"九龙县","latitude":"8.917804","longitude":"101.63508"},
    {"code":"513325","parentCode":"513300","level":"3","name":"雅江县","latitude":"9.922924","longitude":"100.96924"},
    {"code":"513326","parentCode":"513300","level":"3","name":"道孚县","latitude":"30.870126","longitude":"101.194842"},
    {"code":"513327","parentCode":"513300","level":"3","name":"炉霍县","latitude":"31.492155","longitude":"100.675871"},
    {"code":"513328","parentCode":"513300","level":"3","name":"甘孜县","latitude":"2.029329","longitude":"99.762677"},
    {"code":"513329","parentCode":"513300","level":"3","name":"新龙县","latitude":"30.945763","longitude":"100.287518"},
    {"code":"513330","parentCode":"513300","level":"3","name":"德格县","latitude":"2.059409","longitude":"98.967481"},
    {"code":"513331","parentCode":"513300","level":"3","name":"白玉县","latitude":"1.052586","longitude":"99.291922"},
    {"code":"513332","parentCode":"513300","level":"3","name":"石渠县","latitude":"3.187627","longitude":"98.204993"},
    {"code":"513333","parentCode":"513300","level":"3","name":"色达县","latitude":"32.35662","longitude":"100.213885"},
    {"code":"513334","parentCode":"513300","level":"3","name":"理塘县","latitude":"9.895283","longitude":"100.18511"},
    {"code":"513335","parentCode":"513300","level":"3","name":"巴塘县","latitude":"9.916288","longitude":"99.300291"},
    {"code":"513336","parentCode":"513300","level":"3","name":"乡城县","latitude":"9.117376","longitude":"99.738452"},
    {"code":"513337","parentCode":"513300","level":"3","name":"稻城县","latitude":"28.766497","longitude":"100.265891"},
    {"code":"513338","parentCode":"513300","level":"3","name":"得荣县","latitude":"8.736358","longitude":"99.324235"},
    {"code":"513400","parentCode":"510000","level":"2","name":"凉山州","latitude":"27.892393","longitude":"102.259591"},
    {"code":"513401","parentCode":"513400","level":"3","name":"西昌市","latitude":"27.863377","longitude":"102.117888"},
    {"code":"513422","parentCode":"513400","level":"3","name":"木里县","latitude":"28.360344","longitude":"100.953057"},
    {"code":"513423","parentCode":"513400","level":"3","name":"盐源县","latitude":"27.603028","longitude":"101.467624"},
    {"code":"513424","parentCode":"513400","level":"3","name":"德昌县","latitude":"27.331194","longitude":"102.191734"},
    {"code":"513425","parentCode":"513400","level":"3","name":"会理县","latitude":"26.591301","longitude":"102.263927"},
    {"code":"513426","parentCode":"513400","level":"3","name":"会东县","latitude":"26.573608","longitude":"102.742967"},
    {"code":"513427","parentCode":"513400","level":"3","name":"宁南县","latitude":"27.09125","longitude":"102.716634"},
    {"code":"513428","parentCode":"513400","level":"3","name":"普格县","latitude":"27.548286","longitude":"102.568091"},
    {"code":"513429","parentCode":"513400","level":"3","name":"布拖县","latitude":"27.599974","longitude":"102.881928"},
    {"code":"513430","parentCode":"513400","level":"3","name":"金阳县","latitude":"27.706169","longitude":"103.201059"},
    {"code":"513431","parentCode":"513400","level":"3","name":"昭觉县","latitude":"28.013719","longitude":"102.832818"},
    {"code":"513432","parentCode":"513400","level":"3","name":"喜德县","latitude":"28.196489","longitude":"102.449968"},
    {"code":"513433","parentCode":"513400","level":"3","name":"冕宁县","latitude":"28.514859","longitude":"102.068914"},
    {"code":"513434","parentCode":"513400","level":"3","name":"越西县","latitude":"28.59219","longitude":"102.628681"},
    {"code":"513435","parentCode":"513400","level":"3","name":"甘洛县","latitude":"28.974853","longitude":"102.767401"},
    {"code":"513436","parentCode":"513400","level":"3","name":"美姑县","latitude":"8.443545","longitude":"103.10173"},
    {"code":"513437","parentCode":"513400","level":"3","name":"雷波县","latitude":"28.279341","longitude":"103.512505"}
];

// 获取地图民警信息
function getPoliceData() {
    return AJAX({
        url: `${COMMON}/gps/record/query`,
        type: HttpMethod.POST,
        data: {},
        loading: true
    });
}

// 查询地图数据
function getMapData(data) {
    return AJAX({
        url: `${COMMON}/dw/getAll`,
        type: HttpMethod.GET,
        data: data
    });
}

// 查询个人定位信息
function getLocationById(data) {
    return AJAX({
        url: `${COMMON}/lbs/locate`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

//  预警列表部分****************************************************

// 获取预警列表
function getWarningList(params) {
    return AJAX({
        url: `${COMMON}/warning/query`,
        loading: true,
        data: params || null
    });
}

// 预警下达命令
function sendCommand(data) {
    return AJAX({
        url: `${COMMON}/command/send`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 获取预警任务的嫌疑人的 责任民警名字
function getResponsiblePersonByIdcard(data) {
    return AJAX({
        url: `${COMMON}/warning/getResponsiblePersonByIdcard`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

// 预警下达指令联想搜索民警
function associate(data) {
    return AJAX({
        url: `${COMMON}/warning/associate`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

// 指令信息筛选联想
function orderInfoAssociate(data) {
    return AJAX({
        url: `${COMMON}/command/filtrate`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

// 预警签收
function warningSign(data) {
    return AJAX({
        url: `${COMMON}/warning/sign`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 预警批量忽略
function batchIgnore(data) {
    return AJAX({
        url: `${COMMON}/warning/batchIgnore`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

// 预警批量签收
function batchSign(data) {
    return AJAX({
        url: `${COMMON}/warning/batchSign`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 异常数据部分****************************************************

// 获取异常翻译字典
function getAbnormalDictionary() {
    return AJAX({
        url: `${COMMON}/archives/getAbnormalDictionary`,
        type: HttpMethod.GET,
        loading: true
    })
}

// 获取异常数据列表
function getExceptionList(params) {
    // done
    return AJAX({
        url: `${COMMON}/abnormal/query`,
        type: HttpMethod.POST,
        data: params,
        loading: true
    });
}

function getAbnormalDetail(params) {
    // done
    return AJAX({
        url: `${COMMON}/abnormal/detail`,
        type: HttpMethod.GET,
        data: params,
        loading: true
    });
}

// 指令部分****************************************************

// 指令信息
function getOrderInfo(data) {
    return AJAX({
        url: `${COMMON}/command/query`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 指令签收
function orderSign(data) {
    return AJAX({
        url: `${COMMON}/command/sign`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 指令忽略
function orderIgnore(data) {
    return AJAX({
        url: `${COMMON}/command/ignore`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 指令下达
function orderSend(data) {
    return AJAX({
        url: `${COMMON}/command/send`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 指令再次下达
function orderResend(data) {
    return AJAX({
        url: `${COMMON}/command/againSend`,
        type: HttpMethod.POST,
        data: data,
        loading: true
    });
}

// 获取指令详情
function getOrderDetail(data){
    return AJAX({
        url: `${COMMON}/command/detail`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

// 指令信息-获取全息信息
function getIndexDetail(data) {
    return AJAX({
        url: `${COMMON}/archives/objPeople`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

// 月报部分****************************************************

// 调度管控情况月报
function getCommandList(data) {
    return AJAX({
        url: `${COMMON}/exceptions/getCommandList`,
        type: HttpMethod.GET,
        data: data,
        loading: true
    });
}

export {
    getPoliceData,
    getMapData,
    getLocationById,
    getExceptionList,
    getAbnormalDetail,
    getAbnormalDictionary,
    getWarningList,
    sendCommand,
    getOrderInfo,
    getCommandList,
    orderSign,
    warningSign,
    batchIgnore,
    getResponsiblePersonByIdcard,
    associate,
    orderInfoAssociate,
    orderIgnore,
    orderSend,
    orderResend,
    getOrderDetail,
    getIndexDetail,
    batchSign,
    sichuanAreas
};
