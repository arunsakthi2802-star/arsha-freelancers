import 'package:flutter/material.dart';

import '../core/network/api_client.dart';
import '../core/constants/api_endpoints.dart';

class ChatMessage {
  final String sender; // 'user' or 'assistant'
  final String text;
  final DateTime timestamp;

  ChatMessage({
    required this.sender,
    required this.text,
    required this.timestamp,
  });
}

class ChatProvider extends ChangeNotifier {
  final List<ChatMessage> _messages = [
    ChatMessage(
      sender: 'assistant',
      text: 'Hello! I am your ARSHA AI Project Advisor 🤖. How can I help you choose or build your academic project today?',
      timestamp: DateTime.now(),
    )
  ];
  bool _isTyping = false;

  List<ChatMessage> get messages => _messages;
  bool get isTyping => _isTyping;

  Future<void> sendMessage(String text) async {
    if (text.trim().isEmpty) return;

    final userMsg = ChatMessage(
      sender: 'user',
      text: text,
      timestamp: DateTime.now(),
    );
    _messages.add(userMsg);
    _isTyping = true;
    notifyListeners();

    try {
      final response = await ApiClient().client.post(
        ApiEndpoints.chat,
        data: {'message': text},
      );

      String reply = "I can help guide your project selection based on your department, budget, and timeline!";
      if (response.statusCode == 200 && response.data != null) {
        reply = response.data['reply'] ?? response.data['response'] ?? response.data['message'] ?? reply;
      }

      _messages.add(ChatMessage(
        sender: 'assistant',
        text: reply,
        timestamp: DateTime.now(),
      ));
    } catch (e) {
      _messages.add(ChatMessage(
        sender: 'assistant',
        text: 'I can recommend top IEEE 2026 project titles for your department! Submit your request or reach out via WhatsApp for immediate support.',
        timestamp: DateTime.now(),
      ));
    } finally {
      _isTyping = false;
      notifyListeners();
    }
  }

  void clearChat() {
    _messages.clear();
    _messages.add(ChatMessage(
      sender: 'assistant',
      text: 'Hello! I am your ARSHA AI Project Advisor 🤖. How can I help you choose or build your academic project today?',
      timestamp: DateTime.now(),
    ));
    notifyListeners();
  }
}
