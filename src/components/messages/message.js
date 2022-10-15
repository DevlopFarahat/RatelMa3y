import React, { useEffect, useState,useCallback,useRef } from "react";
import MessagesStyles from "./messages.module.css";
import Form from "react-bootstrap/Form";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import GreaterThanWhiteImage from "../../assets/images/greater-than-white.png";
import GreaterThanGrayImage from "../../assets/images/greater-than-gray.png";
import LessThanWhiteImage from "../../assets/images/less-than-white.png";
import LessThanGrayImage from "../../assets/images/less-than-gray.png";
import MessagesIcon from "../../assets/images/messages.png";
import { useTranslation } from "react-i18next";
import {AiFillFilter} from "react-icons/ai";
import {BiReset} from "react-icons/bi";
import CircleGif from "../../assets/images/check-circle.gif";
import {FaTrash} from "react-icons/fa";
import axios from "axios";
const Messages = ()=>{
    const [pageNo,setPageNo] = useState([]);
    const [pageNoCopy,setPageNoCopy] = useState([]);
    const [pageNoArrLength,setPageNoArrLength] = useState(-1);
    const [lastPage,setLastPage] = useState(-1);
    const [currentPage,setCurrentPage] = useState(1);
    //pagination functinality
    const handleUpCommingPage = (event) => {
        const id = event.currentTarget.id;
            setCurrentPage(Number(id));
        if(Number(id)>= 2 && Number(id) > currentPage){
            //currentPage+1 
               if(currentPage+1 !== pageNo[pageNo.length-1].index && Number(id) <= pageNo[pageNo.length-1].index  ){
                //if(Number(id) !== pageNo[pageNo.length-1].index){
                    let pageNoCopy = [...pageNo];
                    console.log("yaa am farahat rakez");
                    pageNoCopy.splice(0,1)
                    setPageNo(pageNoCopy);
               }else{
                    if(Number(id) !== pageNoArrLength && Number(id) === 2 && lastPage.index !== 2){
                    console.log("yaa rab saadny")
                    let pNoCopy = [...pageNoCopy];
                    pNoCopy.splice(0,1);
                    setPageNo(pNoCopy);
                }
               
               }
        }
  }
    
    const getThePreviousPages = (event)=>{
        let pNo = {};
        if(currentPage < pageNoArrLength  && pageNo.length === 2){ 
            console.log("inshaa allah1")
         /*
                pageNo.reverse().splice(0,1);
                pageNo.reverse();
                */
                if(currentPage-1 !== 1){
                    console.log("insorna yaa allah");
                    pageNo.reverse().splice(0,1);
                    pageNo.reverse();
                    pNo.id = (pageNo[0].index-1)
                    pNo.index = (pageNo[0].index-1)
                    pageNo.unshift(pNo);
                    setPageNo(pageNo);
                }else{
                    setPageNo(pageNoCopy);
                }
                if(currentPage > 1)
                setCurrentPage(currentPage-1);
            
            
        }else{
            if(pageNo.length !== 2){
                console.log("inshaa allah")
                console.log(currentPage)
               /*
                    pageNo.reverse().splice(0,1);
                    pageNo.reverse();
                    */
                    console.log(currentPage)
                    console.log(pageNoCopy)
                    if(currentPage-1 !== 1){
                        console.log("insorna yaa allah");
                        pageNo.reverse().splice(0,1);
                        pageNo.reverse();
                        pNo.id = (pageNo[0].index-1)
                        pNo.index = (pageNo[0].index-1)
                        pageNo.unshift(pNo);
                        setPageNo(pageNo);
                    }else{
                        console.log("mona zaki")
                        console.log(pageNoCopy)
                        setPageNo(pageNoCopy);
                    }
                    if(currentPage > 1)
                    setCurrentPage(currentPage-1);
            }else{
                if(currentPage > 1)
                setCurrentPage(currentPage-1);
            }
            console.log(pageNo);
        }  
    }
    const getTheNextPages = (event)=>{
        let pNo = {};
       if(currentPage+1 <= 2){
        if(currentPage+1 !== pageNo[pageNo.length-1].index && pageNo.length !== 2){
              setCurrentPage(currentPage+1);
           
        }else{
            setPageNo(pageNoCopy);
                setCurrentPage(currentPage+1);
        }
       }else{
        if( currentPage+1   >  pageNo[pageNo.length-1].index){
            if( pageNo.length > 2){
                console.log("ياكريم اكرمنا");
                setCurrentPage(currentPage+1);
            }else{
                
                if( currentPage !== pageNoArrLength ){
                    console.log("hgvplm lk uk")
                    /*
                    let pNoCopy = [...pageNo];
                    pNoCopy.splice(0,1);
                    console.log(pNoCopy);
                     setPageNo(pNoCopy);
                     setCurrentPage(currentPage+1);
                     */
                     pageNo.splice(0,1);
                     
                     pNo.id = (currentPage+1)
                     pNo.index = (currentPage+1)
                     pageNo.push(pNo);
                     setPageNo(pageNo);
                    
                     setCurrentPage(currentPage+1);
                }else{
                
                    setCurrentPage(currentPage+1);
                }
                
            }
            
        }else{
  
          //  if(currentPage === 2 && pageNo.length < 9){
            if(currentPage === 2 && pageNo.length < pageNoArrLength){
                console.log("yaa gamad ya farahat");
                let pNoCopy = [...pageNoCopy];
                pNoCopy.splice(0,1);
                console.log(pNoCopy);
                 setPageNo(pNoCopy);
                 setCurrentPage(currentPage+1);
            }else{
                if(pageNo.length > 2){
                    console.log("ahha")
                    let pNoCopy = [...pageNo];
                    pNoCopy.splice(0,1);
                    console.log(pNoCopy);
                     setPageNo(pNoCopy);
                     setCurrentPage(currentPage+1);
                }else{
                    setCurrentPage(currentPage+1);
                }
              
            }
              
        }
       }
       
    }
    // pagination functionality ended
    const [t, i18n] = useTranslation();
    const [messages,setMessages] = useState([]);
    const [msgContent,setMsgContent] = useState("");
    const [selectedRow, setSelectedRow] = useState(-1);
    const [fetchAgain,setFetchAgain] = useState(0);
    const [filterValue, setFilterValue] = useState("");
    const [isUserDeleteAnyMsg,setIsUserDeleteAnymsg] = useState(false);
    const initialResponse = useRef();



    const handlerRowClicked = useCallback((event,msg) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
        showMessageContentAndMarkItAsReadedMsg(msg);
    }, []);
    const filterMessages = () => {
        let filtarationArr = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].name.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(messages[i]);
            }  else if (messages[i].status.toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(messages[i]);
            }
            else if (messages[i].date.split("T")[0].toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(messages[i]);
            }
        }
        filterValue !== ""
            ? setMessages(filtarationArr)
            : setMessages(initialResponse.current)
    };
    const resetTableFiltaration = () => {
        setFilterValue("");
        setMessages(initialResponse.current);
    };
    const handleFiltaration = (event) => {
        setFilterValue(event.target.value);
    };
    const sortMessages = (event)=>{
        let messagesCopy = [...messages];
        for(let i = 0;i< messagesCopy.length;i++){
            if(messagesCopy[i].status === "Read"){
                messagesCopy[i].precedence = 0;
            }else{
                messagesCopy[i].precedence = 1;
            }
        }
        switch(event.target.value){
            case "Read":
                messagesCopy.sort((a_messages,b_messages)=>{
                    return a_messages.precedence - b_messages.precedence;
                });
                break;
                case "Unread":
                    messagesCopy.sort((a_messages,b_messages)=>{
                        return b_messages.precedence - a_messages.precedence;
                    });
                    break;
                    case "ASC":
                    messagesCopy.sort((a_messages,b_messages)=>{
                            return new Date(a_messages.date.split("T")).getTime() - new Date(b_messages.date.split("T")).getTime();
                    });
                    break;
                    case "DSC":
                    messagesCopy.sort((a_messages,b_messages)=>{
                    return new Date(b_messages.date.split("T")).getTime() - new Date(a_messages.date.split("T")).getTime();
                    });
                    break;
                    default:
                            
        }
        setMessages(messagesCopy);
    }
    const showMessageContentAndMarkItAsReadedMsg = (msg)=>{

        setMsgContent(msg.content);
        if(msg.status === 'Unread'){
            
            axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts/${msg._id}`,{status:'Read'}).then((res)=>{
                setFetchAgain(fetchAgain+1);
                console.log(res.data)
            }).catch((error)=>{
                console.log(error);
            });
        }
    
       
    }
    const deleteMessage = (event,msg)=>{
        event.stopPropagation();
        axios.delete(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts/${msg._id}`).then((res)=>{
        setFetchAgain(fetchAgain+1);
        setIsUserDeleteAnymsg(true);
        setTimeout(()=>{
            setIsUserDeleteAnymsg(false);
        },1000)
    
        }).catch((error)=>{
    
        })
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts?limit=300&page=${currentPage}`).then((res)=>{
        let messagesResponse = res.data.data;
        for(let i = 0;i< messagesResponse.length;i++){
            if(messagesResponse[i].status === "Read"){
                messagesResponse[i].precedence = 0;
            }else{
                messagesResponse[i].precedence = 1;
            }
        }
        messagesResponse.sort((a,b)=>{
            return b.precedence - a.precedence;
        })
        setMessages(messagesResponse);
        initialResponse.current = res.data.data;
        let pageN =  Math.ceil(res.data.count/300);
        let numOfPages = [];
        for(let i = 0 ; i < pageN;i++){
          numOfPages.push({id:i+1,index:i+1});
        }
        setPageNoCopy(numOfPages);
        setLastPage(numOfPages[numOfPages.length-1]);
        numOfPages.reverse().splice(numOfPages[numOfPages.length-1],1);
        setPageNoArrLength(numOfPages.length);
        setPageNo(numOfPages.reverse());
        }).catch((error)=>{
            console.log(error);
        })
    },[fetchAgain,currentPage])
    return(

        <>
        {isUserDeleteAnyMsg?<>
            <div className={MessagesStyles["alert"]}>
              <img src={CircleGif} alt="successfull" />
              <span>
                <span style={{ fontWeight: "bold", color: "#198754" }}>
                  {localStorage.getItem("user_name")}
                </span>{" "}
                {t("Has Deleted Message Successfull")}
              </span>
            </div></>:null}
        <div className={MessagesStyles['messages-main']}>
        <div className={MessagesStyles['pagination-container']} style={{direction:'rtl'}}>
           
                
               {pageNo !== undefined?<ul>
                {lastPage !== undefined?
                <button type="button" className={MessagesStyles['btn']} disabled={currentPage === 1?true:false} style={{cursor: 1 === currentPage?'not-allowed':'pointer'}}  onClick={getThePreviousPages}>
               <img src={currentPage === 1?GreaterThanGrayImage:GreaterThanWhiteImage} alt="GreaterThan"/>
                </button>:null}
                {pageNo.map((pN,index)=>(
                  index < 2 ?
                    <li key={pN.index} id={pN.index} style={{background:Number(currentPage)  === pN.index   ?'#198754':'',color:Number(currentPage)  === pN.index  ?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{pN.index}</li>:null
                ))}
                <li className={MessagesStyles['pages-separator']}><span>...</span></li>
                {lastPage !== undefined? 
                <li id={lastPage.id} style={{background:Number(currentPage)  === lastPage.index  ?'#198754':'',color:Number(currentPage)  === lastPage.index?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{lastPage.index}</li>:null}
                {lastPage !== undefined?
                <button type="button" className={MessagesStyles['btn']} disabled={currentPage === lastPage.index?true:false} style={{cursor:currentPage === lastPage.index?'not-allowed':'pointer' }}  onClick={getTheNextPages}>
                    {lastPage !== undefined?<img src={currentPage === lastPage.index?LessThanGrayImage:LessThanWhiteImage} alt="lessThan"/>:null}
                    </button>:null}
               </ul>:null}
                
            </div>
        <div>
        <div className={MessagesStyles['messages-content-main-container']}>
            <div className={MessagesStyles['messages-icon-container']}>
                <img   src={MessagesIcon} alt="messages_icon"/>
            </div>
            {msgContent?
            <p className={MessagesStyles['msg-content']}>
                {msgContent}
            </p>:<img className={MessagesStyles["no-result"]} src={EmptyDataImage} alt="empty"/>}
        </div>
        <div className={MessagesStyles['all-messages-main-container']} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
        <div className={MessagesStyles["table-settings-container"]}>
                    <Form.Label
                    style={{textAlign:t("us")=== t("Us")?'left':'right'}}
                        htmlFor="messagesFilterTxt"
                        className={MessagesStyles["filter-label"]}
                    >
                        {t("filter_label")}
                    </Form.Label>
                    <Form.Control
                        id="messagesFilterTxt"
                        className={MessagesStyles["filter-txt"]}
                        value={filterValue}
                        onChange={handleFiltaration}
                    />
                    <Form.Label style={{textAlign:t("us")=== t("Us")?'left':'right'}}>{t("sort")}</Form.Label>
                    <Form.Select onChange={sortMessages}>
                        <option value="">{t("select")}</option>
                        <optgroup label={t("status")}>
                        <option value="Read">{t("read")}</option>
                        <option value="Unread">{t("unread")}</option>
                        </optgroup>
                        <optgroup label={t("messageDate")}>
                            <option value="ASC">{t("asc")}</option>
                            <option value="DSC">{t("dsc")}</option>
                        </optgroup>
                    </Form.Select>
                    <button
                        type="button"
                        className={MessagesStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={(event) => filterMessages(event.target.value)}
                    >
                        {t("filter_btn")} <AiFillFilter />
                    </button>
                    <button
                        type="button"
                        className={MessagesStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={resetTableFiltaration}
                    >
                        {t("reset")}
                        <BiReset />
                    </button>
                </div>
        <div className={MessagesStyles["table-wrapper"]}>
                 
                    {messages.length === 0 || messages === undefined  ? (
                        <img
                            src={NoResultFiltaration}
                            className={MessagesStyles["no-result"]}
                            alt="no-result"
                        />
                    ) : (
                        <table
                            className={MessagesStyles["messages-table"]}
                            
                        >
                            <thead>
                                <tr>
                                    <th>{t("name")}</th>
                                    <th>{t("email")}</th>
                                    <th>{t("mobile")}</th>
                                    <th>{t("messageDate")}</th>
                                    <th>{t("status")}</th>
                                    <th>{t("settings")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((ms) => (
                                    <tr key={ms._id} id={ms._id} onClick={(event)=>handlerRowClicked(event,ms)}  style={{ background: selectedRow === ms._id ? '#198754' : '', color: selectedRow === ms._id ? '#FFFFFF' : '', boxShadow: selectedRow === ms._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
                                        <td>{ms.name}</td>
                                        <td>{ms.email}</td>
                                        <td>{ms.phone}</td>
                                        <td>{ms.date.split("T")[0]}</td>
                                        <td>{ms.status}</td>
                                        <td><FaTrash  onClick={(event)=>deleteMessage(event,ms)}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
        </div>
        </div>
        </div>
        </>
    )
}
export default Messages;