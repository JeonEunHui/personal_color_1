;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).ready(function () {
			// Init
			$('.image-section').hide();
			$('.loader').hide();
			$('#result').hide();
			$('#gender').hide();
			$('#inform').hide();
			$('.img').hide();
		
			// Upload Preview
			function readURL(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						$('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
						$('#imagePreview').hide();
						$('#imagePreview').fadeIn(650);
					}
					reader.readAsDataURL(input.files[0]);
				}
			}
			$("#imageUpload").change(function () {
				$('.image-section').show();
				$('#btn-predict').show();
				$('#result').text('');
				$('#result').hide();
				$('#inform').text('');
				$('#inform').hide();
				readURL(this);
			});
		
			// Predict
			$('#btn-predict').click(function () {
				var form_data = new FormData($('#upload-file')[0]);
		
				// Show loading animation
				$(this).hide();
				$('.loader').show();
				// Make prediction by calling api /predict
				$.ajax({
					type: 'POST',
					url: '/predict',
					data: form_data,
					contentType: false,
					cache: false,
					processData: false,
					async: true,
					success: function (data) {
					
						// Get and display the result
						$('.loader').hide();
						$('#result').fadeIn(600);
						$('#gender').fadeIn(600);
						

						if(data == 'FemaleFall') 
                		{
							$('#gender').text(' 당신은 여자군요!');
							$('#result').text(' 당신의 컬러는:  Fall');

                    		$('#inform').fadeIn(600);
                    		$('#inform').text('fall');

                    		$('#information').text('가을 웜톤은 차분하고 무거운 분위기의 부드러운 컬러로 전반적으로 고급스럽고 강하면서도 편안 느낌을 가지고 있어요!부드러운 인상 속에 우아한 분위기를 풍겨서 어른스럽고 차분한 이미지를 가지고 있어요');
                    
                    		document.getElementById("bestMakeUp").innerHTML='Best Make Up<br>-카키, 다크 브라운, 오렌지 브라운 등의 리치한 컬러의 아이 메이크업<br>-누드한 핑크나 오렌지 색상 혹은 오렌지와 레드, 브라운이 적절히 섞인 립 컬러<br>-인디핑크나 테라코타, 조금 깊은 느낌의 오렌지 블러셔를 이용한 치크 메이크업'
                    
                    		$("#eyeImg").attr("src", "https://imgbntnews.hankyung.com/bntdata/images/photo/201509/809a76d2035059f69744de4ee8b5d1a5.jpg")
                    		$("#lipImg").attr("src", "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=http://t1.daumcdn.net/news/201509/19/bntnews/20150919090009371ukvz.jpg")
                    
                    		document.getElementById("worstMakeUp").innerHTML='<br>Worst Make Up<br>-그린 새도우, 선명한 오렌지 립<br>-핫핑크계열의 메이크업<br>-흑발<br>-블루 베이스의 메이크업'
                    

                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('대비감을 강하게 주기 보다는 은은한 톤온톤 룩으로 연출하는게 좋아요');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MThfMjg3%2FMDAxNjYwODA5OTcyMjQ0.pNQBtByiV9TeUuVqvzvTiVJ8nN0c2OpGe5kIEOVeigIg.E2SvJGtY_BJcKPLu7zkxtb2PtNnEd7KUK61LwUMeyNYg.JPEG.hyun114111%2FPARIS_AW_19-20_D7_STST3866.jpg&type=a340");

                    		$("#cimage2").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzExMDZfMjI2%2FMDAxNTA5OTIzNDYzMDUx.qpfOU2U3EJVHIoYmRLNnlYpr6l-VkGGA0r3w8PPlVygg.T7rmaWjYEUVnZ73hTgGylCl2kvD7UigiLubOYKwhZtUg.JPEG.feincloset7%2F%25B3%25B2%25C0%25DA_%25B0%25A5%25BB%25F6_%25B0%25A1%25B5%25F0%25B0%25C7_%25C4%25DA%25B5%25F0_11.JPG&type=a340");
                    
                		}
						if(data == 'MaleFall') 
                		{
							$('#gender').text(' 당신은 남자군요!');
							$('#result').text(' 당신의 컬러는:  Fall');
                    		$('#inform').fadeIn(600);
                    		$('#inform').text('fall');

                    		$('#information').text('가을 웜톤은 차분하고 무거운 분위기의 부드러운 컬러로 전반적으로 고급스럽고 강하면서도 편안 느낌을 가지고 있어요!부드러운 인상 속에 우아한 분위기를 풍겨서 어른스럽고 차분한 이미지를 가지고 있어요');
                    
                    		document.getElementById("bestMakeUp").innerHTML='염색컬러추천<br>-채도가 낮고 어두운 계열<br>-다크브라운, 레드브라운, 모카블론드'
                    
                    		$("#eyeImg").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNjEyMzBfMjQ0%2FMDAxNDgzMDI1MTIwNTMz.xemv3kZkv2e3fHygmHaB7ZnNpIjkUxmtuQIZjOiK0Zsg.Smvx847MlJNyxmfbg5ILfL4a2wzOaHi1FW8FzVMCSJ4g.JPEG.enjoyles%2FIMG_9238.jpg&type=a340")
                    		$("#lipImg").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMjFfNzYg%2FMDAxNjE2MjgxMDU3MDk0.9frPkPQF8eAM5fn2KKc-4rlwZIuHBKluATgifn32UUcg.WpxRygzy4dMQz_vfc3G3O4Zdublxcz5aDkKGGCp6onog.JPEG.guyzhair%2F30905136_187766768525787_2309592829195714560_n.jpg&type=a340")
                    

                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('대비감을 강하게 주기 보다는 은은한 톤온톤 룩으로 연출하는게 좋아요');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDAzMTJfMjIz%2FMDAxNTgzOTgxMTg2NzEz.NxpBfeo4tQYlpijVfmd3c6A0L35CHKfgmJ6KSOtNaO8g.E_Q1YHelkjn_V_1qHYshQtaIhiRXQiV89Ws1r7zo2X8g.JPEG.h2eonhu%2FKakaoTalk_20200312_113732931.jpg&type=a340");

                    		$("#cimage2").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzExMDZfMjI2%2FMDAxNTA5OTIzNDYzMDUx.qpfOU2U3EJVHIoYmRLNnlYpr6l-VkGGA0r3w8PPlVygg.T7rmaWjYEUVnZ73hTgGylCl2kvD7UigiLubOYKwhZtUg.JPEG.feincloset7%2F%25B3%25B2%25C0%25DA_%25B0%25A5%25BB%25F6_%25B0%25A1%25B5%25F0%25B0%25C7_%25C4%25DA%25B5%25F0_11.JPG&type=a340");
                    
                		}

						else if(data == "FemaleSpring")
                		{
							$('#gender').text(' 당신은 여자군요!');
							$('#result').text(' 당신의 컬러는:  Spring');
                    		$('#inform').fadeIn(600);
                    		$('#inform').text('spring');

                    		$('#information').text('고명도·고채도의 노란기 있는 밝은 색이 주를 이루며 화사한 느낌을 가지고 있어요. 귀엽고 사랑스러운 이미지를 가지고 있어요!');

                    		document.getElementById("bestMakeUp").innerHTML='Best Make up<br>-그린, 스카이 블루 섀도우, 채도가 높은 색상의 아이섀도우<br>-오렌지나 로즈, 베이지, 옅은 브라운 계열의 섀도우를 이용한 아이 메이크업<br>-선명한 레드나 핑크립<br>-밝은 레드, 피치 색상의 치크<br>-자연갈색이나 자연흑발, 발색이 진하지 않은 펄제품'
                    		$("#eyeImg").attr("src", "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=http://t1.daumcdn.net/news/201509/04/bntnews/20150904101705224spcb.jpg")
                    		$("#lipImg").attr("src", "https://www.bntnews.co.kr/data/bnt/image/201509/0ce6f62bdcd6353533b4aa11eae17211.jpg")

                    		document.getElementById("worstMakeUp").innerHTML='<br>Worst Make Up<br>-새까만 머리색<br>-스모키 눈화장과 진한 볼터치<br>-탁하고 짙은 카키 등의 섀도우<br>-딸기우유 색의 립 컬러'

                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('쨍한 컬러보다는 흰색 끼가 도는 컬러를 선택하는게 좋아요');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDdfMTM0%2FMDAxNjMxMDE5Njc0NTgz.BTxAQhDISyiDle2pvorh_Wn5bZQcqMMk3_xacZOiM4kg.2VfFsf7IcPJXnPaz15PYfu_uL9xFnItNSM5ZC1Jl99cg.JPEG.hyunju8615%2FP20210906_180628760_D583EDF3-D7AC-40A9-A598-39E503BCB769.JPG&type=a340");

                    		$("#cimage2").attr("src", "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fscontent-icn1-1.cdninstagram.com%2Fvp%2F082fd0a4ed2285e476cc62b9bd2d9d9d%2F5D3C1FE8%2Ft51.2885-15%2Fe35%2F51906521_2049567878673613_5399591081565326210_n.jpg%3F_nc_ht%3Dscontent-icn1-1.cdninstagram.com&type=a340");
              
                		}
						else if(data == "MaleSpring")
                		{
							$('#gender').text(' 당신은 남자군요!');
							$('#result').text(' 당신의 컬러는:  Spring');
                    		$('#inform').fadeIn(600);
                    		$('#inform').text('spring');

                    		$('#information').text('고명도·고채도의 노란기 있는 밝은 색이 주를 이루며 화사한 느낌을 가지고 있어요. 귀엽고 사랑스러운 이미지를 가지고 있어요!');

                    		document.getElementById("bestMakeUp").innerHTML='염색컬러추천<br>-생기를 주면서 채도가 드러나는 컬러<br>-미디엄브라운, 카퍼블론드, 스트로베리블론드'
                    		$("#eyeImg").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MDRfOTMg%2FMDAxNTk2NTE1MTI4MDY0.H543SBqkkSbFE_aeHLEm3j9EDziduhUrxaxhkP50ENYg.mvMm01pU4avAUBKr5S4qEh1RGeJilpwGozGeNoPk8gsg.JPEG.doo-bu%2F13.jpg&type=a340")
                    		$("#lipImg").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MDRfMjM2%2FMDAxNTk2NTE1MTMwNDA1.jz7LTskjBoHQILvf1TZzHeCcoyK1iMy-FMawKRHLwuQg.JFHJxzgTyKKsqP3MS2u_AVD0OWf1PFNi2mducuRqZh0g.JPEG.doo-bu%2F14.jpg&type=a340")


                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('쨍한 컬러보다는 흰색 끼가 도는 컬러를 선택하는게 좋아요');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA2MDJfMjY1%2FMDAxNTkxMDc2NzEwNTM5.z_ZIIH8hy-tfTUasOIdU4UaGkyplrerXg1bRjASunhcg.hFwwKGcSQUd2gF6FtBzV0fN_rMcFYWA3jtPslmlA9c8g.JPEG.mmdcolor%2F1591076712960.jpg&type=a340");
                    		$("#cimage2").attr("src", "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fscontent-icn1-1.cdninstagram.com%2Fvp%2F082fd0a4ed2285e476cc62b9bd2d9d9d%2F5D3C1FE8%2Ft51.2885-15%2Fe35%2F51906521_2049567878673613_5399591081565326210_n.jpg%3F_nc_ht%3Dscontent-icn1-1.cdninstagram.com&type=a340");
              
                		}

                		else if(data == "FemaleSummer")
                		{
							$('#gender').text(' 당신은 여자군요!');
							$('#result').text(' 당신의 컬러는:  Summer');
                    		$('#inform').fadeIn(600);
                    		$('#inform').text('summer');
                    
                    		$('#information').text('여름 쿨톤은 블루베이스로 한 파스텔 계열이나 회색이 섞인 컬러로 이루어져있고 청량감 넘치고 시원하고 차분한 분위기를 지녔어요. 시원하고 깨끗한 이미지를 가졌어요!');

                    		document.getElementById("bestMakeUp").innerHTML='Best Make Up<br>-회갈색, 로즈베이지, 그레이시 한 블루계열의 아이 메이크업<br>-입자가 작은 실버 펄 섀도우<br>-베이비 핑크 로즈 핑크와 같은 핑크계열, 라즈베리, 푸시아 색상의 립<br>-푸른빛이 도는 핑크나 라벤더 계열 블러셔'
                    		$("#eyeImg").attr("src", "https://imgbntnews.hankyung.com/bntdata/images/photo/201509/97121fe24573e448ed73d46f4898d36c.jpg")
                    		$("#lipImg").attr("src", "https://t1.daumcdn.net/news/201509/11/bntnews/20150911090011969ytad.jpg")

                    		document.getElementById("worstMakeUp").innerHTML='<br>Worst Make Up<br>-강한 스모키 메이크업<br>-토마토레드 립과 같은 짙고 무거운 색상<br>- 노랑색이나 주황색을 바탕으로 하는 짙은 색상'

                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('고명도의 쨍하고 깨끗한 색의 옷이 잘어울려요');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20211217_171%2F1639709434941T4Ogp_JPEG%2F40845333650927976_254812942.jpg&type=a340");
                    		$("#cimage2").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMTFfMjYz%2FMDAxNDg0MTMwMjcyNjQz.bRMwOrOPB3dE0LiCPpwwh57LMGEhPHCphYc7Ysvs4Dog.kmKidNfni_JuZqGE2CVOb2LF9EPCGI3I4n0i6hJGJE0g.JPEG.mani0005%2FIMG_3264.JPG&type=a340");

                
                		}
						else if(data == "MaleSummer")
                		{
							$('#gender').text(' 당신은 남자군요!');
							$('#result').text(' 당신의 컬러는:  Summer');
                    		$('#inform').fadeIn(600);
                    		$('#inform').text('summer');
                    
                    		$('#information').text('여름 쿨톤은 블루베이스로 한 파스텔 계열이나 회색이 섞인 컬러로 이루어져있고 청량감 넘치고 시원하고 차분한 분위기를 지녔어요. 시원하고 깨끗한 이미지를 가졌어요!');

                    		document.getElementById("bestMakeUp").innerHTML='염색컬러추천<br>-엘로우나 오렌지빛 보단 저채도색의 머리<br>-스모키코코아, 애쉬브라운, 애쉬그레이'
                    		$("#eyeImg").attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzDljnehlAEnCK_ezYa08j4mAjF0HyTsahXQ&usqp=CAU")


                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('고명도의 쨍하고 깨끗한 색의 옷이 잘어울려요');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_3406573%2F34065730821.jpg&type=a340");
                    		$("#cimage2").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMTFfMjYz%2FMDAxNDg0MTMwMjcyNjQz.bRMwOrOPB3dE0LiCPpwwh57LMGEhPHCphYc7Ysvs4Dog.kmKidNfni_JuZqGE2CVOb2LF9EPCGI3I4n0i6hJGJE0g.JPEG.mani0005%2FIMG_3264.JPG&type=a340");

                
                		}

                		else if(data == "FemaleWinter")
                		{
							$('#gender').text(' 당신은 여자군요!');
							$('#result').text(' 당신의 컬러는:  Winter');
                    		$('#inform').fadeIn(600);
                    		$('#inform').text('winter');

                    		$('#information').text('푸른기 있는 색이 주를 이루며 선명하고 강해요. 도시적이고 도도한 이미지를 지녔어요!');

                    		document.getElementById("bestMakeUp").innerHTML='Best Make Up<br>-블랙계열의 아이라이너<br>-회갈색이나 회보라빛과 같은 퍼플계열의 섀도우<br>-라일락, 에메랄드, 블루색상의 아이메이크업<br>-쨍한 푸시아나 퍼플, 버건디와 같이 인공적인 느낌이 강한 색의 립<br>-블랙 헤어, 백색에 가까운 금발'
                    		$("#eyeImg").attr("src", "https://imgbntnews.hankyung.com/bntdata/images/photo/201509/ab895076303d3b2a90b0fbf37a0e06f1.jpg")
                    		$("#lipImg").attr("src", "https://www.bntnews.co.kr/data/bnt/image/201509/354ac5425e0ee579b22f777d60a6d198.jpg")

							document.getElementById("worstMakeUp").innerHTML='<br>Worst Make Up<br>-오렌지와 같이 주황빛이 도는 색상의 메이크업<br>-브라운 색상의 아이라이너'


                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('대비감있는 컬러가 좋아요. 셋업수트도 잘 어울립니다!');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200921_299%2F16006800649079lnNA_JPEG%2F1815960639604193_961552142.jpg&type=a340");
                    		$("#cimage2").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA0MDNfMTMx%2FMDAxNTg1OTAyNzkwNDg1.B1wNmB3ekOh-U9zBzKR8dj2xdoxK_0o6iyBfqatqiMMg.KDXCbzGwMTWXmYPQDDHmQ1zzB6BkjEVP3UGsWQsluxEg.JPEG.jongdallab%2Funnamed_%25285%2529.jpg&type=a340");
            
                		}
						else if(data == "MaleWinter")
                		{
							$('#gender').text(' 당신은 남자군요!');
							$('#result').text(' 당신의 컬러는:  Winter');
                    		$('#inform').fadeIn(600);
                    		$('#inform').text('winter');

                    		$('#information').text('푸른기 있는 색이 주를 이루며 선명하고 강해요. 도시적이고 도도한 이미지를 지녔어요!');

                    		document.getElementById("bestMakeUp").innerHTML='염색컬러추천<br>-검은색이 가장 잘어울려요!'
                    		$("#eyeImg").attr("src", "https://mblogthumb-phinf.pstatic.net/MjAxODA4MDlfMjIz/MDAxNTMzODA1MTk3NDk5.H5J8oFs7Zo4fM5cA-0ut-Yrzi-my5qvCSS2n7G5ETwsg.CnHpxzbsEJAGzsbS_Yx_wx_hDCClRmT-t-bw5D89KTcg.JPEG.doo-bu/image_9828065191533805165102.jpg?type=w800")

                    		$('#clothes').text('코디추천');
                    		$('#clothe').text('대비감있는 컬러가 좋아요. 셋업수트도 잘 어울립니다!');  
                    		$("#cimage1").attr("src", "https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20200921_299%2F16006800649079lnNA_JPEG%2F1815960639604193_961552142.jpg&type=a340");
                    		$("#cimage2").attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8qVqsal5U-En9rVt5NRVaJIA_Q9BhiPNXEA&usqp=CAU");
            
                		}
		
						console.log('Success!');
					},
				});
			});
		
		});

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('.js-gtco-nav-toggle').addClass('gtco-nav-white');

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};

	var formTab = function() {

		$('.tab-menu a').on('click', function(event){
			var $this = $(this),
				data = $this.data('tab');

			$('.tab-menu li').removeClass('active');
			$this.closest('li').addClass('active')

			$('.tab .tab-content-inner').removeClass('active');
			$this.closest('.tab').find('.tab-content-inner[data-content="'+data+'"]').addClass('active');

			event.preventDefault();

		});

	};

	var offcanvasMenu = function() {

		$('#page').prepend('<div id="gtco-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle gtco-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;

		// $('.gtco-section').waypoint( function( direction ) {


			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-box.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn animated-fast');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft animated-fast');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight animated-fast');
								} else {
									el.addClass('fadeInUp animated-fast');
								}

								el.removeClass('item-animate');
							},  k * 200, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '85%' } );
		// }, { offset: '90%'} );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var owlCarousel = function(){
		
		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});


		

	};

	

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#gtco-counter').length > 0 ) {
			$('#gtco-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};


	var dateForm = function() {
		$('#date-start').datepicker();
	};

	var parallax = function() {
		$(window).stellar({
			horizontalScrolling: false,
			hideDistantElements: false, 
			responsive: true

		});
	};


	
	$(function(){
		mobileMenuOutsideClick();
		formTab();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		owlCarousel();
		goToTop();
		loaderPage();
		counterWayPoint();
		dateForm();
		parallax();
	});

}());




