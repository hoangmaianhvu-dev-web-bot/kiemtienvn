
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAITips = async (taskTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là trợ lý AI cho ứng dụng kiếm tiền qua link rút gọn. 
      Người dùng đang làm nhiệm vụ: "${taskTitle}". 
      Hãy đưa ra 3 lời khuyên ngắn gọn, hữu ích để họ vượt qua link rút gọn nhanh chóng và an toàn (tránh quảng cáo rác). 
      Viết bằng tiếng Việt, giọng điệu thân thiện, chuyên nghiệp.`,
    });
    return response.text || "Hãy kiên nhẫn vượt qua các bước xác minh robot để nhận quà nhé!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lỗi kết nối AI. Vui lòng thử lại sau.";
  }
};

export const generateEconomyAnalysis = async (user: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Phân tích kinh tế cho người dùng:
      - Level: ${user.level}
      - Tier: ${user.tier}
      - Số dư: ${user.balanceVND} VND
      - Nhiệm vụ đã xong: ${user.tasksCompleted}
      Hãy viết 1 câu nhận xét ngắn gọn về tiến trình của họ và gợi ý họ nên đổi Quân Huy hay Kim Cương lúc này thì hời hơn. Sử dụng phong cách game thủ.`,
    });
    return response.text;
  } catch (error) {
    return "Bạn đang làm rất tốt, tích lũy thêm để đổi skin xịn nhé!";
  }
};
